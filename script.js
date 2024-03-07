const apikey = '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';
const btn = document.querySelector("#button");
const outputbox = document.querySelector("#result")
const inputbox = document.querySelector("#input")



async function getmessage(){   
        let loading = document.querySelector(".load");
        loading.style.display = "flex";

        const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apikey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputbox.value}],
            max_tokens:500
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        // console.log(data);
        // loading.style.display = "none";
        let index = 1;

        const writingeffect = () =>{
        let typingContent = data.choices[0].message.content.slice(0,index);
        outputbox.innerText = typingContent;
        index++;
                    
        setTimeout(()=>{
                writingeffect();
            },30)

        }
        writingeffect();
            
    }catch(error){
        outputbox.innerHTML = error;
        }

    }



btn.addEventListener('click', getmessage);

