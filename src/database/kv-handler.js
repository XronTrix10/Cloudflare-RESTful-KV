// copyright 2023 © Xron Trix | https://github.com/Xrontrix10

import { v4 as uuidv4 } from 'uuid' // Import the UUID library
import { returnJson, notFound, serverError, returnSuccess, dataConflict } from '../handler/res-handler';

export async function getValueByKey(key) {
  try {
    const all_data = await Cybertron.get(key);
    return all_data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getIndexByKey(id, key) {
  const decoded_id = decodeURIComponent(id) // URL decode the name parameter

  const data = await getValueByKey(key);
  let dataArray = []

  if (data) { // if data fetch was successful
    dataArray = JSON.parse(data)
  }
  else {
    return [-1, -1];
  }

  const dataIndex = dataArray.findIndex(
    data_t => data_t.id === decoded_id,
  )

  return [dataArray, dataIndex];
}

// Function to retrieve faculty data by name from the KV store
export async function getValueByID(id, key) {

  const [dataArray, dataIndex] = await getIndexByKey(id, key);

  if (dataArray === -1) {
    return serverError();
  }
  else if (dataIndex === -1) {
    return notFound();
  }

  return returnJson(JSON.stringify(dataArray[dataIndex]));

}


// Function to update data by id in the KV store
export async function updateValueByKeyId(id, updatedData, key) {

  const [dataArray, dataIndex] = await getIndexByKey(id, key);

  if (dataArray === -1) {
    return serverError();
  }
  else if (dataIndex === -1) {
    return notFound();
  }

  // Update the faculty data
  dataArray[dataIndex] = {
    ...dataArray[dataIndex],
    ...updatedData,
  }

  // Store the updated data back in KV
  try {
    await Cybertron.put(key, JSON.stringify(dataArray));
  }
  catch (e) {
    console.log(e);
    return serverError();
  }
  return returnSuccess();
}


// Function to insert new data in the KV store
export async function insertNewValueByKey(updatedData, key) {

  const data = await getValueByKey(key);
  let dataArray = [];
  let dataIndex = -1;
  let dataId = uuidv4();

  if (data) { // if data fetch was successful
    dataArray = JSON.parse(data);

    dataIndex = dataArray.findIndex(
      data_t => data_t.mobile === updatedData.mobile,
    );

    // Check for unique DataId conflict
    do {
      dataId = uuidv4();
    } while (dataArray.some(every_data => every_data.id === dataId))
  }
  else {
    console.log('Key is EMPTY !');
  }

  // if key is faculty
  if (key === 'faculties') {

    if (dataIndex !== -1) {
      return dataConflict();
    }

    // Define the expected fields and their default values
    const expectedFields = ['name', 'role', 'image', 'mobile']
    const defaultValues = {
      name: '',
      role: '',
      image: '',
      mobile: '',
    }

    // Create the new Data object using Data with missing fields filled in
    const newData = {
      id: dataId,
      ...expectedFields.reduce((acc, field) => {
        acc[field] = updatedData[field] || defaultValues[field]
        return acc
      }, {}),
    }
    // Push the new Data into the array
    dataArray.push(newData)

    try {
      // Store the new data back in KV
      await Cybertron.put('faculties', JSON.stringify(dataArray));
      return returnJson(JSON.stringify({ id: dataId, success: true }));
    } 
    
    catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

// Function to delete data by ID from the KV store
export async function deleteValueById(id, key) {

  const [dataArray, dataIndex] = await getIndexByKey(id, key);

  if (dataArray === -1) {
    return serverError();
  }
  else if (dataIndex === -1) {
    return notFound();
  }

  // Data found, remove it from the array
  dataArray.splice(dataIndex, 1)

  // Store the updated data back in KV without the deleted faculty
  await Cybertron.put('faculties', JSON.stringify(dataArray))

  return returnSuccess(); // Return true to indicate successful deletion
}

export async function deleteEntireKey(key) {

  try {
    await Cybertron.delete(key);
    return returnSuccess(); // Return true to indicate successful deletion
  }

  catch (error) {
    console.error(error);
    return serverError(); // Return false to indicate
  }
}