// example api detail force
// https://data.police.uk/api/forces/north-yorkshire

// example api force
// https://data.police.uk/api/forces

import axios from 'axios';

export const API = axios.create({
  baseURL: `https://data.police.uk/api/forces`
});
