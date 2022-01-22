export function liveSearch(searchTerm:any){
    let lostSearchParas=0;
    let a;
    let  searchParas=document.getElementsByClassName("search-result-para");
    let neededValue;

    for(let i=0; i<searchParas.length; i++){
      a=searchParas[i].getElementsByTagName("a")[0];
      neededValue=a.textContent || a.innerText;

      if(neededValue.toUpperCase().includes(searchTerm.toUpperCase()) ){
        
        searchParas[i].classList.remove("hideSearch")
        if(lostSearchParas>0)
          lostSearchParas--;
      }else{
        searchParas[i].classList.add("hideSearch");
        lostSearchParas++;
      }
    }
  return lostSearchParas;
}