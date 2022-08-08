const schar = ['~','\'',"!",'@','#','$','%','^','&','*','(',")",'-','+','=','{','}','[',']','\\','/',':',';','"','<','>',',','.','?']
export function nameChecker(name){
    if(name.length===0)
    return "Please provide a name"
    if(name.length>25)
    return "Your name can only be 25 characters long"
    if(name.includes(' '))
    return "Your name cannot contain spaces"
    for(let i=0;i<schar.length;i++){
        if(name.includes(schar[i]))
        return "Your name cannot contain special characters"
    }
    return "ok"
}

export function usernameChecker(username){
    if(username.length===0)
    return "Please provide a username"
    if(username.length>25)
    return "Your username can only be 25 characters long"
    if(username.includes(' '))
    return "Your username cannot contain spaces"
    for(let i=0;i<schar.length;i++){
        if(username.includes(schar[i]))
        return "Your username cannot contain special characters"
    }
    return "ok"
}

export function passwordChecker(pw,cpw){
    if(pw.length===0)
    return "Please provide a password"
    if(pw.length<8)
    return "Your password needs to be at least 8 characters long"
    if(pw.includes(' '))
    return "Your password cannot contain spaces"
    if(pw.length>25)
    return "Your password can only be 25 characters long"
    if(pw!==cpw)
    return "Your passwords do match"
    return 'ok'
}

export function emailChecker(email,cemail){
    if(email.length<6||!email.includes("@")||!email.includes(".com"))
    return "Please provide a valid email"
    if(email.includes(' '))
    return "Your email cannot contain spaces"
    if(email!==cemail)
    return "Your emails do not match"
    return "ok"
}

export function nameSettingsChecker(name,oldName){
    if(name.length===0)
    return "Please provide a name"
    if(name.length>25)
    return "Your name can only be 25 characters long"
    if(name.includes(' '))
    return "Your name cannot contain spaces"
    for(let i=0;i<schar.length;i++){
        if(name.includes(schar[i]))
        return "Your name cannot contain special characters"
    }
    if(name===oldName)
    return "You are already using this name"
    return "ok"
}

export function usernameSettingsChecker(oldUsername,oldUsernameInpt,newUsername,cUsername){
    if(oldUsername===""||newUsername===""||cUsername==="")
    return "Please fill up all fields"
    if(newUsername.length>25)
    return "Your new username can only be 25 characters long"
    if(newUsername.includes(' '))
    return "Your new username cannot contain spaces"
    for(let i=0;i<schar.length;i++){
        if(newUsername.includes(schar[i]))
        return "Your new username cannot contain special characters"
    }
        if(newUsername===cUsername){
            if(oldUsername===oldUsernameInpt){
                if(oldUsername!==cUsername){

                    return 'ok'
                }
                return "Your new username cannot be the same as your old username"
            }
            return "You've rpovided the wrong old username"
        }
        return "Usernames do not match"

}

export function passwordSettingsChecker(oldpw,newpw,cpw){
    if(oldpw===""||newpw===""||cpw==="")
    return "Please fill up all fields"
    if(newpw.length<8)
    return "Your password needs to be at least 8 characters long"
    if(newpw.includes(' '))
    return "Your password cannot contain spaces"
    if(newpw.length>25)
    return "Your password can only be 25 characters long"
    if(newpw!==cpw)
    return "Your passwords do match"
    if(oldpw!==cpw){
        return 'ok'
    }
    return "Your new Password cannot be the same as your old Password"
}

export function emailSettingsChecker(oldEmail,oldEmailInpt,newEmail,cEmail){
    if(newEmail.length<6||!newEmail.includes("@")||!newEmail.includes(".com"))
    return "Please provide a valid email"
    if(newEmail.includes(' '))
    return "Your email cannot contain spaces"
    if(oldEmailInpt!==""&&newEmail!==""&&cEmail!==""){
        if(newEmail===cEmail){
            if(oldEmail===oldEmailInpt){
                if(oldEmail!==cEmail){
                    return "ok"
                }
                return  "Your new email cannot be the same as your old email"
            }
            return  "You've provided the wrong old email"
        }
        return  "Your emails do not match"
    }
    return "Please fill in all fields"

}
