'use client'
import React from "react"
import { useState , useEffect } from "react"
import { usePathname } from 'next/navigation'
import axios from "axios"

interface issuData{
    createdAt:string,
    description :string,
    status:string,
    title:string,
    _id:string
    }

export default function (){
    const pathname = usePathname()
    console.log(pathname)
    const url = pathname;
    const id = url.split('/').pop();
    console.log(id);

   const[data , setData] = useState<issuData>({})
   
   useEffect(()=>{
    const fetchData = async () => {
        try {
          const response = await axios.get(`/api/issue/get/${id}`)
          const data = await response.data;
          console.log(response)
          setData(data);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();

   },[])


   //for date
const dateString =  data.createdAt;
const dateObject = new Date(dateString);

const year = dateObject.getFullYear() % 100; // Get last two digits of the year
const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
const day = dateObject.getDate();

const formattedYear = year < 10 ? `0${year}` : year;
const formattedMonth = month < 10 ? `0${month}` : month;
const formattedDay = day < 10 ? `0${day}` : day;

const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;

   console.log(data)

    return(
        <div className="flex flex-row justify-between w-ful max-sm:flex-col">
     

         <div className="flex flex-col m-10 w-[60%] max-sm:ml-0 max-sm:w-full">
            <div className="ml-10 mt-5">
                <h1 className="text-[32px] font-bold  ">{data.title}</h1>
            </div>

            <div className=" flex gap-5 ml-10 mt-2">
              { data.status === 'OPEN' && <p className="bg-red-100 p-2 pl-8 pr-8 rounded-lg text-red-600">open</p>}
              { data.status === 'CLOSED' &&  <p className="bg-green-100 p-2 pl-8 pr-8 rounded-lg text-green-600">closed</p>}
              { data.status === 'IN_PROGRESS' &&  <p className="bg-violet-100 p-2 pl-8 pr-8 rounded-lg text-violet-600">in-progress</p>}
              <p className="text-[18px] font-[600] mt-2">{formattedDate}</p>
            </div>

             <div className=" border-[1px] border-black ml-10 mt-10 p-10 rounded-lg text-[20px] font-[500] max-sm:m-5 max-sm:mt-10">
                {data.description}
             </div>
         </div>


            <div className="flex flex-col justify-center mr-20 gap-5 max-sm:m-2">
                {/* <div>unassign</div>
                <input type="select" /> */}
                <div className="bg-black text-white p-3 pl-10 pr-10 rounded-lg max-sm:pr-2 max-sm:w-[10rem]">Edit Issue</div>
                <div  className="bg-black text-white p-3 pl-10 pr-10 rounded-lg  max-sm:pr-2 max-sm:w-[10rem]">Delete Issue</div>

            </div>

        </div>
    )
}