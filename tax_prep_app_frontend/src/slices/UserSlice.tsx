import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// type UserCredentials = {
//     username: string
//     password: string
// }

export interface User {
    id: string
    username: string
    password: string
    enabled: boolean
    userDetail: {
        ssn: number
        firstName: string
        middleName: string
        lastName: string
        email: string
        dob: string
        street1: string
        street2: string
        city: string
        state: string
        zip: number
        country: string
    };
    taxFilings: {
        married: boolean
        dependents: number
        totalRefundAmount: number
        totalAmountDue: number
    };
    formW2s: {
        employerName: string
        ein: number
        employerStreet1: string
        employerStreet2: string
        employerCity: string
        employerState: string
        employerZip: number
        wagesAndTips: number
        ssWithheld: number
        taxesWithheld: number
        medicareWithheld: number
    }[];
    form1099s: {
        payerName: string
        payerStreet1: string
        payerStreet2: string
        payerCity: string
        payerState: string
        payerZip: number
        payerTin: number
        taxesWithheld2: number
        totalCompensation: number
    }[]
}

export function getUser(): User {
    let userString = localStorage.getItem('user')
    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        return parsedUser;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    return getDefaultUser()
  }

  function getDefaultUser(): User {
    return {
      id: '',
      username: '',
      password: '',
      enabled: false,
      userDetail: {
        ssn: 0,
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        dob: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: 0,
        country: '',
      },
      taxFilings: {
        married: false,
        dependents: 0,
        totalRefundAmount: 0,
        totalAmountDue: 0,
      },
      formW2s: [],
      form1099s: [],
    }
  }

  const URL = "http://54.221.143.25:8080/users/";

export const loginUser = createAsyncThunk( URL + 
    'loginUser',
    async () => {
        // fetch request for login backend goes here --- currently just grabbing first user in the collection
        // pass userCredentials in the body and encrypt the password
        fetch(URL)
            .then((res) => res.json())
            .then((data: User[]) => {
                localStorage.setItem('user', JSON.stringify(data[1]))
                return true
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        // user: null as any, <-- uncomment this and delete the fetch below once login is set up
        user: fetch(URL)
        .then((res) => res.json())
        .then((data: User[]) => {
            localStorage.setItem('user', JSON.stringify(data[0])) //7 for no forms
            return true
        })
        .catch((err) => {
            console.log(err.message)
        }) as any,
        loading: false as boolean,
        error: "" as string
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.user = null
                state.error = ""
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.error = ""
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.user = null
                if (action.error.message == "Request failed with status code 401") {
                    state.error = "Invalid Credentials"
                }
            })
    }
})

export default userSlice.reducer;