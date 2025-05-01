// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { updateUser, getUsers } from "../../services";

// export const useUserSettings = () => {
//     const [ userSettings, setUserSettings ] = useState();

//     const fetchUserSettings = async() => {
        
//         const response = await getUsers();

//         if(response.error){
//             return toast.error(
//                 response.e?.response?.data || 'Ocurrio un error al obtener la data del canal'
//             )
//         }

//         setUserSettings({
//             email: response.data.email,
//             name: response.data.name,
//             password: response.data.password,
//             phone: response.data.phone,
//             surname: response.data.surname,
//             username: response.data.username
//         })
//     }

//     const saveSettings = async(data) => {
//         const repsonse = await updateUser(data)
//     }
// }