import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const AddContribution = () => {
    const [newcontent,setnewcontent] = useState("Text Appear Here");
    const [ideaid,setideaid] = useState("");
    const [ownerid,setownerid] = useState("");
    const [title,setTitle] = useState("Title Here");
    const [category , setCategory] = useState("Category Here");
    const [changeSummary , setchangesummary] = useState("");
    const {ideaslist,backendUrl,userData} = useContext(AppContent);
    const handlecontribution = async()=>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/user/addcontribution`,{ideaid,newcontent,changeSummary,ownerid},{withCredentials:true});
        if(data.success){
            toast.success(data.message);
        }
        else{
            toast.error(data.message);
        }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error.message);
        }
    };
    const handlechangedata = async(idea)=>{
        setTitle(idea.title);
        setCategory(idea.category);
        setnewcontent(idea.description);
        setideaid(idea._id);
        setownerid(idea.authorid);
    };
  return (
    <div className="flex flex-row min-h-screen bg-[#0D0F2D] text-gray-100">
      <aside className="w-1/4 bg-[#151136] p-6 border-r border-gray-800">
        <h2 className="text-lg font-semibold mb-6 text-gray-200">
          All ideas
        </h2>
        <div className="flex flex-col gap-4 text-gray-300">
          {ideaslist.length > 0 ? (
            ideaslist.map((idea, idx) => (
              <div
                key={idx}
                onClick={() => handlechangedata(idea)}
                className="p-3 bg-[#1F1B44] hover:bg-[#2B2566] rounded-lg cursor-pointer transition-all"
              >
                
              </div>
            ))
          ) : (
            <p className="text-gray-500">No ideas to contribute</p>
          )}
        </div>
      </aside>

      <main className="flex-1 bg-[#1B1537] p-8 flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <div className="bg-[#0D0F2D] text-gray-200 px-4 py-2 rounded-md w-1/3">
            {title}
          </div>
          <span className="text-gray-400">{category}</span>
        </div>

        <div className="flex-1 flex flex-col relative p-4 bg-[#0D0F2D] rounded-lg overflow-auto">
          <input
              type="text"
              className="bg-[#0D0F2D] text-gray-200 px-4 py-2 rounded-md w-1/3"
              value={newcontent}
              onChange={(e) => setnewcontent(e.target.value)}
            />
            <input
              type="text"
              className="bg-[#0D0F2D] text-gray-200 px-4 py-2 rounded-md"
              placeholder='Enter Change Summary'
              value={changeSummary}
              onChange={(e) => setchangesummary(e.target.value)}
            />
          
<button onClick={()=>handlecontribution()}>Request Contribution</button>
        </div>
      </main>
    </div>
  );
}

export default AddContribution
