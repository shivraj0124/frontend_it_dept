import React,{useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
function AddAchievement() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState(null);
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [title, description,photo];
        let countLoop = 0;
        
            arr.map((item,index) => {
                if (typeof item === 'string') {
                    item = item.replace(/\s+/g, ''); // Assign the result back to item
                }
                if (typeof item === 'string') {
                    item = item.trim(); // Assign the result back to item
                }
            if (item === '') {
                countLoop += 1
                // setUpdateOrNot(0)
                updateOrNot = 0
                if (countLoop <= 1){
                    
                if(index === 0){
                    toast.error('Title Field must filled', {
                        autoClose: 2000,
                        position: 'bottom-center'
                    })
                }else if(index === 1){
                    toast.error('Description Field must filled', {
                        autoClose: 2000,
                        position: 'bottom-center'
                    })
                }else {
                    toast.error('Must Upload Photo', {
                        autoClose: 2000,
                        position: 'bottom-center'
                    })
                }
                }
            }
        })

        if (updateOrNot === 1) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('photo', photo);

            try {
                const response = await axios.post(`${urlBackend}/api/v1/add-achievements`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
                if (response.data.success) {
                    toast.success('Achievement Added Successfully!', {
                        autoClose: 2000,
                        position: "bottom-center"
                    });

                }
                else {
                    toast.error('Achievement with this title already exists', {
                        autoClose: 2000,
                        position: "bottom-center"
                    });
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.warn(error.response.data.message, {
                        autoClose: 2000,
                        position: 'bottom-center'
                    });
                } else {
                    toast.error(error.message, {
                        position: "bottom-center",
                        autoClose: 2000
                    });
                }
            }
        }
    };
  return (
      <div className='h-screen overflow-y-scroll pb-10 bg-blue-50'>
          <div className="w-100 mt-5 flex justify-center max-xl:px-2 ">
              <div className="w-[90%] flex md:flex-row-1 max-md:flex-col bg-white shadow-xl rounded-lg ">
                  <div className='w-[100%] text-center  bg-white pb-10'>
                      <h1 className='text-center font-semibold text-2xl underline underline-offset-4 mt-2'>Add Achievement</h1>
                      <form className='mt-10 text-black' onSubmit={handleOnSubmit}>
                          <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Title' onChange={(e) => setTitle(e.target.value)} required/>
                          <br />
                          <textarea className='placeholder:text-slate-400 border-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none rounded-md p-5 text-xl font-semibold mt-10 w-[80%]  ' rows={5} placeholder='Description..' onChange={(e) => setDescription(e.target.value)} required>
                          </textarea>
                          <br/>
                          <label className=' border-blue-900 text-blue-900 font-semibold bg-blue-300 hover:bg-blue-600 hover:text-white py-[6px] px-[12px] inline-block cursor-pointer mt-5 max-md:w-[80%] rounded-md'>
                              <input type="file" name="photo" className='hidden' onChange={handleFileChange} required />
                              Upload Photo
                          </label>
                          <br />
                          <button className='mt-8 w-[80%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                              Add Achievement
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default AddAchievement
