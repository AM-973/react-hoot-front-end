const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`

const index = async () => {
  try {
    const res = await fetch(BASE_URL)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const show = async (hootId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${hootId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const create = async (formData) => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()
    return data

  } catch (err) {
    console.log(err)
  }
}

const createComment = async (commentFormData, hootId) => {
    const token = localStorage.getItem('token')
   const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(commentFormData)
   })
   const data = await res.json()
   return data
} 

const deleteHoot = async (hootId) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data
    } catch(err) {
        console.log(err)
        }
}

const update = async (formData, hootId) => {
    try{
        const token = localStorage.getItem('token')
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        return data
    }
    catch(err){
        console.log(err)
    }
}

const deleteComment = async (hootId, commentId) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BASE_URL}/${hootId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data
    } catch(err) {
        console.log(err)
    }
}
const updateComment = async (hootId, commentId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${hootId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }; 


export {
  index,
  show,
  create,
  createComment,
  deleteHoot,
  update,
  deleteComment,
  updateComment
}