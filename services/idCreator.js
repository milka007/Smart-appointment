exports.idCreator = (prevId)=>{
    
    const idName = prevId[0]+prevId[1] 
    
    const idLen= prevId.length
    var prevNum = prevId.substring(2,idLen)
    prevNum = parseInt(prevNum)
    var nextNum = prevNum+1 
     nextNum = nextNum.toString();
     var nextNumLen = nextNum.length
     var idNameLen = 2
     var remainingLen = idLen-nextNumLen-idNameLen
     var remainingZero = ""
     while(remainingLen>0){

        remainingZero= remainingZero+"0"
        remainingLen--
     }
     var ans = `${idName}${remainingZero}${nextNum}` 

   

    return ans;

   
}