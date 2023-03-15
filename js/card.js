const loadAiHub = () => {
    toggleSpinner(true)
    // get data to fetch
    const URL = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(URL)
        .then(res => res.json())
        .then(data => displayData(data.data.tools));
}
// Display Ai hub
const displayData = aiHubs => { 
    const aiContainer = document.getElementById('ai_container')
    // --------Slice aiHub ----------
    const seeMore = document.getElementById('see_more');
    if (aiHubs.length > 6) {
        aiHubs = aiHubs.slice(0, 6);
        seeMore.classList.remove('d-none')
    }
    aiHubs.forEach(aihub => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
        <div class="card h-100 p-2">
            <div class = "p-2 rounded-lg">
                <img  src="${aihub.image}" class="card-img-top" alt="..." class="w-100 rounded-lg">
            </div>
        <div class="card-body">
            <h5 class ="fw-bold mb-4 ">Features</h5>
            <div class ="lh-1 text-secondary">
                <p>1. ${aihub.features[0]}</p>
                <p>2. ${aihub.features[1]}</p>
                <p>3. ${aihub.features[2] ? aihub.features[2] : 'No more feature' }</p>
            </div>
        </div>
        <div class="container d-flex justify-content-between border-top ">
           <div class="me-5 mt-3">
           <h5 class ="fw-bold mb-4">${aihub.name}</h5>
                <p><i class="fa-solid fa-calendar-check"></i> <span class = "date">${aihub.published_in}</span></p>
           </div >
           <div class="ms-5 d-flex justify-content-center align-items-center " >
                <button type="button" onclick= "loadAiData('${aihub.id}')" class="btn btn-danger rounded "  data-bs-toggle="modal" data-bs-target="#aiHubModal"><i class="fa-solid fa-arrow-right"></i></button>
           </div>
        </div>
      </div>      
        `;
        aiContainer.appendChild(aiDiv);
    });
    toggleSpinner(false);   
}

// toggleSpinner handler area
const toggleSpinner = isLoader => {
    const spinnerSections = document.getElementById('spinner_section');
    if (isLoader) {
        spinnerSections.classList.remove('d-none')
    } else {
        spinnerSections.classList.add('d-none')
    }
}
document.getElementById('btn_seemore').addEventListener('click', function () {
    toggleSpinner(true)
    const loadAiHub = () => {
        // get data to fetch
        const URL = `https://openapi.programming-hero.com/api/ai/tools`
        fetch(URL)
            .then((res) => res.json())
            .then((data) => displayData(data.data.tools));
    }
    // Display Ai hub
    const displayData = aiHubs => {
        const aiContainer = document.getElementById('ai_container')
        aiContainer.innerHTML = "";

        const seeMore = document.getElementById('see_more');
        if (aiHubs.length) {

            seeMore.classList.add('d-none')
        }
        aiHubs.forEach(aihub => {
            const aiDiv = document.createElement('div');

            aiDiv.classList.add('col');
            aiDiv.innerHTML = `
            <div class="card h-100 p-2">
                <div class = "p-2 rounded-lg">
                    <img  src="${aihub.image}" class="card-img-top" alt="..." class="w-100 rounded-lg">
                </div>
            <div class="card-body">
                <h5 class ="fw-bold mb-4 ">Features</h5>
                <div class ="lh-1 text-secondary">
                    <p>1. ${aihub.features[0]}</p>
                    <p>2. ${aihub.features[1]}</p>
                    <p>3. ${aihub.features[2]}</p>
                </div>
            </div>
            <div class="container d-flex justify-content-between border-top ">
            <div class="me-5 mt-3">
            <h5 class ="fw-bold mb-4">${aihub.name}</h5>
                 <p><i class="fa-solid fa-calendar-check"></i> <span class = "date">${aihub.published_in}</span></p>
            </div>
            <div class="ms-5 d-flex justify-content-center align-items-center " >
            <button type="button" onclick= "loadAiData('${aihub.id}')" class="btn btn-danger rounded "  data-bs-toggle="modal" data-bs-target="#aiHubModal"><i class="fa-solid fa-arrow-right"></i></button>
       </div>
         </div>
          </div>           
            `;
            aiContainer.appendChild(aiDiv);
        });
        toggleSpinner(false)
    };
    loadAiHub()
});

const  loadAiData = id => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res =>  res.json())
    .then(data => displayloadAiData(data))
};
const displayloadAiData = (aiInfo) =>{
    // console.log(aiInfo.data);
    // Set daynamic title
    const aiTitle = document.getElementById('ai_title');
    aiTitle.innerText = aiInfo.data.description;

    // set price basic 
    const pricing = document.getElementById('pricing_1')
    pricing.innerText = aiInfo.data?.pricing?.[0]?.price ? aiInfo.data.pricing[0].price : 'Free of Cost/Basic';

    // set peice pro
    const pricePro = document.getElementById('pricing_2');
    pricePro.innerText = aiInfo.data?.pricing?.[1]?.price ? aiInfo.data.pricing[1].price : 'Free of Cost/Basic';

    //set contact 
    const contact = document.getElementById('pricing_3')
    contact.innerText = aiInfo.data?.pricing?.[2]?.price ? aiInfo.data.pricing[2].price : 'Free of Cost/Basic';

    // features area Desing
    const feature_area = document.getElementById('featuers');
    feature_area.innerHTML = `
    <h6 class="fw-bold">Features</h6>
    <ul>
        <li><small>${aiInfo.data.features[1].feature_name ? aiInfo.data.features[1].feature_name : 'No data found'}</small></li>
        <li><small>${aiInfo.data.features[2].feature_name ? aiInfo.data.features[2].feature_name : 'No data found'}</small></li>
        <li><small>${aiInfo.data.features[3].feature_name ? aiInfo.data.features[3].feature_name : 'No data found'}</small></li>
    </ul>
    `;   
    // features area Desing
    const Integrations_area = document.getElementById('integrations');
    Integrations_area.innerHTML = `
    <h6 class="fw-bold">Integrations</h6>
    <ul>
        <li><small>${ aiInfo.data?.integrations?.[0] ? aiInfo.data.integrations[0] : 'No data found' } </small></li>
        <li><small>${ aiInfo.data?.integrations?.[1] ? aiInfo.data.integrations[1] : 'No data found'}</small> </li>
        <li><small>${ aiInfo.data?.integrations?.[2] ? aiInfo.data.integrations[2] : 'No data found' }</small> </li>
    </ul>
    `;
    const secondContainer = document.getElementById('second_container')
    secondContainer.innerHTML = `
    <div class="card w-full" >
    <button class="bg-danger text-white w-50 position-absolute top-0 end-0 border-0 mt-1 rounded-2 id="accuracy_item" ">${aiInfo.data.accuracy.score ? aiInfo.data.accuracy.score: ' '}% accuracy</button>
    <img src="${aiInfo.data.image_link[0]}" class="card-img-top p-2" alt="...">
    <div class="card-body">
      <h5 class="card-title text-center fw-bold">${aiInfo.data?.input_output_examples?.[0]?.input ? aiInfo.data.input_output_examples[0].input : "Can you give any Example!!" }</h5>
      <p class="card-text text-center text-muted"><small  class=" text-muted">${aiInfo.data?.input_output_examples?.[0]?.output ? aiInfo.data.input_output_examples[0].output : 'No! Not Yet!! Take a break!!!'}</small></p>
    </div>
    </div>   `
}


loadAiHub()



// sort by date 
document.getElementById('sort_btn').addEventListener('click' , function(){
    const aiContainer = document.getElementById('ai_container');
    // console.log(aiContainer.children);

    const cardArry = Array.from(aiContainer.children);

    cardArry.sort((card1, card2) => {
        let date1 = new Date (card1.querySelector(".date").innerText)
        let date2 = new Date (card2.querySelector(".date").innerText)
        if(date1 >  date2){
            return 1
        } else if (date1 < date2){
            return -1;

        }else{
            return 0;
        }
    })
        for (cards of cardArry ){
            aiContainer.appendChild(cards);
        }
})