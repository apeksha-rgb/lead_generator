let myLeads =[]

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click" , function(){
    //grab the url of the current tab
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    // console.log(tabs[0].url)
    //save the url instead of loggin out
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    })
    
})

function render(leads){
    let listItems = ""
    for(let i=0 ; i< leads.length ; i++){
        //template strings/template literals
        listItems += `
            <li>
                <a  target='_blank' href='${leads[i]}'> 
                ${leads[i]} 
                </a>
            </li>`
        // console.log(listItems)

    }
    ulEl.innerHTML = listItems
    
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function (){
    // myLeads.push("www.awesomeleads.com")
    myLeads.push(inputEl.value)
    // console.log(myLeads)
    inputEl.value = ""
    //saving leads to local storage using JSON.stringify()
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})



