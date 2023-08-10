import { useState } from "react"
import CreateEditUserAccount from "../components/account/CreateEditUserAccount"
import DisplayPersonalInfo from "../components/account/DisplayPersonalInfo"
import { getUser } from "../slices/UserSlice"

export default function PersonalInformation() {

  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const user = getUser();


  const handleUpdateTransition = (): void => {
    showUpdateForm ? window.location.reload() : setShowUpdateForm(!showUpdateForm)
  }

  return (
    <>
      <DisplayPersonalInfo
        user={user}
        hidden={showUpdateForm}
        handleUpdateTransition={handleUpdateTransition}
      ></DisplayPersonalInfo>

      <CreateEditUserAccount
        accountExists={true}
        existingUser={user}
        hidden={showUpdateForm ? false : true}
        handleUpdateTransition={handleUpdateTransition}
      ></CreateEditUserAccount>
    </>
  )
}