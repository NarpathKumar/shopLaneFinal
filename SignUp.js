console.clear();
const loginUrl = "https://5eeba96c5e298b0016b69331.mockapi.io/login";
const signup = $("#signup");
const login = $("#login");
const loginButton = $("#login-button")
const form = $('form')
login.click(()=>{
    if(login.text() === "Login ?."){
        login.text("Sign Up?.");
        loginButton.val("Login")
        signup.text("Login")
    }
    else if(login.text() === "Sign Up?."){
        login.text("Login ?.")
        loginButton.val("Sign Up")
        signup.text("Sign Up")
    }
})
form.on({
    'submit' : (e)=>{
       e.preventDefault();
       let sname = e.target.name.value.trim();
       let spass = e.target.password.value;
       if(loginButton.val() === "Sign Up"){
            let obj = {
                "userName": sname,
                "password": spass
            }
            if(e.target.avatar.value.trim() === ""){
                window.localStorage.setItem("webAvatar","https://lh3.googleusercontent.com/-_qdpXsXXbjo/XvdACxy2WUI/AAAAAAAABhM/0wQZy32JW3s6gtgejF2EIT-Md84kiByKgCEwYBhgLKtQDAL1Ocqw9eFIn-3ziBZOoezU8axB2NrCSBNmSpVLvyScCAdlUm7_bPNv4vewdm5gmMLu9kvUyRe_XLjkud-HxnFYRJZvhb3n6xjc07Mf7dbGjVebRmtHGAQvsQ4Gq1aHMljIsTUjsnmsuFN2DCuzDDiTpgz8mOKXYnwdpYZwmYQFCrHmytvJ5-e8HttoACIP9c-tdsw53F3djeYzx6adF0stM3SbssHBrg7mRN20n_YV617znK5mRuYZx3V7WZNlWI3Ulfcr0pfoDf1kTOLDAlsd9kBPircDkFRjOsPtRmCsRr6WMSX-ceNqsFC3A4qyE80BbkJBGxno8L1OIQdE5D9Ajsde3TRVdNjc0imNP0eLroNfiYEPvRB3HUsBn_reZtnkfTxiObZrg3xRUblvr_zgBOeimYI_hKs0BeEsDpgPbcJ9QcjiAkkKSMsCV0vylwTS1cjfdzJudR9HhSxRN5_z709FCbKzX184wbkkpJ-2r-bOUjCth31wel2nHmxY-pj120C3GWuGRSZm8c5fqYQKvWNpGO0KJUWyN4rgvEbdarwZVyJ3zBjaEMVMyWGkZWjSfCGPSSCEkI5DG9gMu7vX1FXbMnPZrArwG9DikYbz-OSqwMLKF3fcF/w140-h140-p/2020-06-27.jpg")
            }
            else window.localStorage.setItem("webAvatar",e.target.avatar.value.trim())
            $.get(loginUrl,(f)=>{
                var bool = false
                for(var i=0; i<f.length; i++){
                    if(f[i].userName === sname){
                        bool = true;
                        break
                    }
                }
                if(bool){
                    alert("Name is Taken, Please enter different userName")
                }
                else {
                    $.post(loginUrl,obj,(e)=>{
                        console.log(e)
                        window.localStorage.setItem("webLaneId",e.id)
                        window.location.assign("./shopLane.html");
                        form.get(0).reset();
                    })
                }
            })
       }
       else if(loginButton.val() === "Login"){
            $.get(loginUrl,(k)=>{
                let pos=-1;
                for(var i=0; i<k.length; i++){
                    if(k[i].userName === sname && k[i].password === spass){
                        pos = k[i].id;
                        break;
                    }
                }
                if(pos>-1){
                    if(e.target.avatar.value.trim() === ""){
                        if(window.localStorage.getItem("webAvatar")===null){
                            window.localStorage.setItem("webAvatar","https://lh3.googleusercontent.com/-_qdpXsXXbjo/XvdACxy2WUI/AAAAAAAABhM/0wQZy32JW3s6gtgejF2EIT-Md84kiByKgCEwYBhgLKtQDAL1Ocqw9eFIn-3ziBZOoezU8axB2NrCSBNmSpVLvyScCAdlUm7_bPNv4vewdm5gmMLu9kvUyRe_XLjkud-HxnFYRJZvhb3n6xjc07Mf7dbGjVebRmtHGAQvsQ4Gq1aHMljIsTUjsnmsuFN2DCuzDDiTpgz8mOKXYnwdpYZwmYQFCrHmytvJ5-e8HttoACIP9c-tdsw53F3djeYzx6adF0stM3SbssHBrg7mRN20n_YV617znK5mRuYZx3V7WZNlWI3Ulfcr0pfoDf1kTOLDAlsd9kBPircDkFRjOsPtRmCsRr6WMSX-ceNqsFC3A4qyE80BbkJBGxno8L1OIQdE5D9Ajsde3TRVdNjc0imNP0eLroNfiYEPvRB3HUsBn_reZtnkfTxiObZrg3xRUblvr_zgBOeimYI_hKs0BeEsDpgPbcJ9QcjiAkkKSMsCV0vylwTS1cjfdzJudR9HhSxRN5_z709FCbKzX184wbkkpJ-2r-bOUjCth31wel2nHmxY-pj120C3GWuGRSZm8c5fqYQKvWNpGO0KJUWyN4rgvEbdarwZVyJ3zBjaEMVMyWGkZWjSfCGPSSCEkI5DG9gMu7vX1FXbMnPZrArwG9DikYbz-OSqwMLKF3fcF/w140-h140-p/2020-06-27.jpg")
                        }
                      }
                      else window.localStorage.setItem("webAvatar",e.target.avatar.value.trim())
                    console.log("id pass are correct the position is ")
                    console.log(pos)
                    window.localStorage.setItem("webLaneId",pos)
                    window.location.assign("./shopLane.html");
                    form.get(0).reset();
                }
                else  alert("UserName and password Mismatched")
            })
       }
    }
})