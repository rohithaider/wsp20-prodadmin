function show_page() {
    auth('prodadmin@test.com',show_page_secured,'/login')

    
<<<<<<< HEAD
=======


}
>>>>>>> 4c86885afa42fd648f512fca9e8a7c82deb55fc7


}

<<<<<<< HEAD


let products; //list of products from database

async function show_page_secured() {

=======
let products; //list of products from database

async function show_page_secured() {

>>>>>>> 4c86885afa42fd648f512fca9e8a7c82deb55fc7
    glPageContent.innerHTML = '<h1> Show Products </h1>'
    glPageContent.innerHTML += `
        
        <a href = '/home' class="btn btn-outline-primary">Home </a>
        <a href = '/add' class="btn btn-outline-primary">Add a product </a>
        <br>
        <br>
        
        
        
        `;

    try {

        products = []

        const snapshot = await firebase.firestore().collection(COLLECTION)
        
<<<<<<< HEAD
        
        .orderBy("price")                            
        .get()
=======
                                .where("name","==","p1")
                                .orderBy("price")
                                .get()
>>>>>>> 4c86885afa42fd648f512fca9e8a7c82deb55fc7
        snapshot.forEach(doc => {
            const { name, summary, price, image, image_url } = doc.data()

            const p = { docId: doc.id, name, summary, price, image, image_url }
            products.push(p)
        })
<<<<<<< HEAD

    } catch (e) {

        glPageContent.innerHTML = 'Firestore access error. Try again later ! <br>' + e
        return

    }


   // console.log(products)

    if (products.length === 0) {

        glPageContent.innerHTML += '<h1>No products in the database</h1>'
        return


    }

    for (let index = 0; index < products.length; index++) {

=======

    } catch (e) {

        glPageContent.innerHTML = 'Firestore access error. Try again later ! <br>' + e
        return

    }


    console.log(products)

    if (products.length === 0) {

        glPageContent.innerHTML += '<h1>No products in the database</h1>'
        return


    }

    for (let index = 0; index < products.length; index++) {

>>>>>>> 4c86885afa42fd648f512fca9e8a7c82deb55fc7
        const p = products[index]
        if (!p) continue;

        glPageContent.innerHTML+= `
        
        <div id="${p.docId}" class="card" style="width: 18rem; display: inline-block">
        <img src="${p.image_url}" class="card-img-top">
        <div class="card-body">
        <h5 class="card-title">${p.name}</h5>
        <p class="card-text">${p.price}<br/>${p.summary}</p>

        <button class ="btn btn-primary" type="button"
        onclick = "editProduct(${index})">Edit</button>

        <button class ="btn btn-danger" type="button"
        onclick = "deleteProduct(${index})">Delete</button>
        
        </div>
      </div>
        
        
        `;
    }

}




async function deleteProduct(index) {
    try {
        const p = products[index]

        //console.log('await doc delete')
        //delete (1) Firestore doc, (2) Storage Image
        await firebase.firestore().collection(COLLECTION).doc(p.docId).delete()

<<<<<<< HEAD


        const imageRef = firebase.storage().ref().child(IMAGE_FOLDER + p.image)

        //console.log('await image delete')
        await imageRef.delete()
=======
>>>>>>> 4c86885afa42fd648f512fca9e8a7c82deb55fc7

        //assign id for card

        const card = document.getElementById(p.docId)
        card.parentNode.removeChild(card)

        delete products[index]
    } catch (e) {

        glPageContent.innerHTML = 'Delete Error: <br>' + JSON.stringify(e)

        const imageRef = firebase.storage().ref().child(IMAGE_FOLDER + p.image)

        //console.log('await image delete')
        await imageRef.delete()

        //assign id for card

        const card = document.getElementById(p.docId)
        card.parentNode.removeChild(card)

        delete products[index]
    } catch (e) {

        glPageContent.innerHTML = 'Delete Error: <br>' + JSON.stringify(e)

    }
}

let imageFile2Update
let cardOriginal

function editProduct(index){

    

    const p = products[index]
    const card = document.getElementById(p.docId)
    cardOriginal =  card.innerHTML 
<<<<<<< HEAD

    card.innerHTML=`
    <div class= "form-group">

        Name: <input class = "form-control" type = "text" id = "name" value="${p.name}" />
        <p id = "name_error" style="color:red;"/>

    </div>

    <div class= "form-group">

    Summary: <br>
    <textarea class = "form-control" id = "summary" cols = "40" rows="5">${p.summary}</textarea>
    <p id = "summary_error" style="color:red;"/>

    </div>

    <div class= "form-group">

    Price: <input class = "form-control" type = "text" id = "price" value = "${p.price}"/>
    <p id = "price_error" style="color:red;"/>

    </div>
    Current Image:<br>
    <img src="${p.image_url}"><br>


    <div class= "form-group">

    New Image: <input type = "file" id= "imageButton" value = "upload" accept="image/*"  onchange="showMyImage(this)" >
    <img id="thumbnil" style="width:100%; margin-top:20px;"  src="" alt="image"/>
    
    

    


    
    

    </div> 
    <button class = "btn btn-danger" type = "button" onclick ="update(${index})"  >>Update</button>
=======

    card.innerHTML=`
    <div class= "form-group">

        Name: <input class = "form-control" type = "text" id = "name" value="${p.name}" />
        <p id = "name_error" style="color:red;"/>

    </div>

    <div class= "form-group">

    Summary: <br>
    <textarea class = "form-control" id = "summary" cols = "40" rows="5">${p.summary}</textarea>
    <p id = "summary_error" style="color:red;"/>

    </div>

    <div class= "form-group">

    Price: <input class = "form-control" type = "text" id = "price" value = "${p.price}"/>
    <p id = "price_error" style="color:red;"/>

    </div>
    Current Image:<br>
    <img src="${p.image_url}"><br>


    <div class= "form-group">

    New Image: <input type = "file" id= "imageButton" value = "upload" />
    

    </div> 
    <button class = "btn btn-danger" type = "button" onclick ="update(${index})">Update</button>
>>>>>>> 4c86885afa42fd648f512fca9e8a7c82deb55fc7
    <button class = "btn btn-secondary" type = "button" onclick ="cancel(${index})">Cancel</button>

    
    
    `;

    const imageButton = document.getElementById('imageButton')
    imageButton.addEventListener('change',e=>{

        imageFile2Update=e.target.files[0]




    })



}

function cancel(index){
    const p =products[index]
    const card = document.getElementById(p.docId)
    card.innerHTML=cardOriginal
}

async function update(index){

<<<<<<< HEAD
    

=======
>>>>>>> 4c86885afa42fd648f512fca9e8a7c82deb55fc7
    const p = products[index]
    const newName = document.getElementById('name').value
    const newSummary =document.getElementById('summary').value
    const newPrice = document.getElementById('price').value

    //validate new values
    const nameErrorTag =document.getElementById('name_error')
    const summaryErrorTag =document.getElementById('summary_error')
    const priceErrorTag =document.getElementById('price_error')

    nameErrorTag.innerHTML = validate_name(newName)
    summaryErrorTag.innerHTML = validate_summary(newSummary)
    priceErrorTag.innerHTML = validate_price(newPrice) 


    if(nameErrorTag.innerHTML||summaryErrorTag.innerHTML||priceErrorTag.innerHTML){
        return
    }

    //ready to update the database 

    let updated =false
    const newInfo = {}
    if(p.name!==newName){

        newInfo.name=newName
        updated=true

   }
   if(p.summary!==newSummary){
       newInfo.summary=newSummary
       updated=true
   }
   if(p.price!==newPrice){

    newInfo.price=Number(Number(newPrice).toFixed(2))
    updated=true
   }

   if(!imageFile2Update){
       updated=true
   }
   if(!updated){
       cancel(index)
       return
   }
    //update db

    try {
        if(imageFile2Update){
            const imageRef2del = firebase.storage().ref().child(IMAGE_FOLDER+p.image)
            await imageRef2del.delete()
            const image =Date.now()+ imageFile2Update.name
            const newImageRef = firebase.storage().ref(IMAGE_FOLDER+image)
            const taskSnapshot=await newImageRef.put(imageFile2Update)
            const image_url =await taskSnapshot.ref.getDownloadURL()

            newInfo.image = image
            newInfo.image_url = image_url

        }

        await firebase.firestore().collection(COLLECTION).doc(p.docId).update(newInfo)
        window.location.href='/show'

        
    } catch (e) {
        glPageContent.innerHTML='Firestore/Storage update error<br>'+JSON.stringify(e)
        
    }

}

<<<<<<< HEAD
function showMyImage(fileInput) {
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {           
        var file = files[i];
        var imageType = /image.*/;     
        if (!file.type.match(imageType)) {
            continue;
        }           
        var img=document.getElementById("thumbnil");            
        img.file = file;    
        var reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                aImg.src = e.target.result; 
            }; 
        })(img);
        reader.readAsDataURL(file);
    }    
}

=======
>>>>>>> 4c86885afa42fd648f512fca9e8a7c82deb55fc7





