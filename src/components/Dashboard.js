import React, { useEffect } from 'react'
import { getTemperatures } from '../services'
import { energy_saving } from '../utils/savings'

export default function Dashboard() {

  const compute = async ()=>{
    var temp_out
    const {data} = await getTemperatures()
    data.forEach(element => {
      if (element["id"] == "1970003"){
        temp_out = element["temperature"]
      }

    });
    console.log(energy_saving(temp_out))

  }

  useEffect(() => {
  compute()
  }, [])


  return (
    <div>No Content</div>
  )
}
