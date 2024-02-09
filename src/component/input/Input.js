import React from "react";
import "./input.css";
function Input({ placeholder, id, value, onChange, label, error }) {
  return (
    <>
      <label>{label}</label>
      <input
        className={"input"}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error ? <labe></labe> : null}
    </>
  );
}

export default Input;


// const userValidate = (e) => {
//   let item=e.target.value;
//   const nameRegex = /^[A-Z]([-']?[a-z]+)*( [A-Z]([-']?[a-z])*)$/;
//   if(!item){
//       isName=true
//       setNameErrors("Enter yoour name")
//   }else if (!nameRegex.test(item)) {
//     isName=true
//     setNameErrors("not validate")
//   }else{
//     isName=false
//     setNameErrors("")
//     setName(item)
//   }
// };

// const emailValidate=(e)=>{
//   let item=e.target.value;
//   const nameRegex = /^[A-Z]([-']?[a-z]+)*( [A-Z]([-']?[a-z])*)$/;
//   if(!item){
//       isEmail=true
//       setEmailErrors("Enter email Address")
//   }else if (!nameRegex.test(item)) {
//     isEmail=true
//     setEmailErrors("not validate")
//   }else{
//     isEmail=false
//     setEmailErrors("")
//     setName(item)
//   }
// }

// let isName = true;
//   let isEmail = true;

//   const [name, setName] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [number, setNumber] = useState(null);
//   const [password, setPassword] = useState(null);
//   const [confirmPassword, setconfirmPassword] = useState(null);
//   const [nameError, setNameErrors] = useState("");
//   const [emailError, setEmailErrors] = useState("");
//   const [numberError, setNumberErrors] = useState(false);
//   const [cPassError, setCPassErrors] = useState(false);
//   const [passError, setPassErrors] = useState(false);
