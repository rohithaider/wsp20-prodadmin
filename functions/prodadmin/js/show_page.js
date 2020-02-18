function show_page(){


    show_page_secured()
    
    
    }



    let products; //list of products from database

    async function show_page_secured() {

        glPageContent.innerHTML='<h1> Show Products </h1>'
        glPageContent.innerHTML+=`
        
        <a href = '/home' class="btn btn-outline-primary">Home </a>
        <a href = '/add' class="btn btn-outline-primary">Add a product </a>
        <br>
        <br>
        
        
        
        `;

        try {

            products = []
    
            const snapshot = await firebase.firestore().collection(COLLECTION).get()
            snapshot.forEach(doc => {
                const{name,summary,price,image,image_url }= doc.data()
    
                const p = {docId: doc.id,name,summary,price,image,image_url}
                products.push(p)
            })
            
        } catch (e) {
    
            glPageContent.innerHTML = 'Firestore access error. Try again later ! <br>'+e
            return
            
        }
    

        //console.log(products)

        if(products.length ===0){

            glPageContent += '<h1>No products in the database</h1>'
            return
    

    }

    for(let index = 0; index < products.length;index++){

        const p = products[index]  
        if (!p) continue;

        glPageContent.innerHTML += `
        
        <div id=" ${p.docId} " class="card" style="width: 18rem; display: inline-block">
        <img src=" ${p.image_url}" class="card-img-top">
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

    async function deleteProduct(index){
        try {
            const p = products[index]

            console.log('await doc delete')
            //delete (1) Firestore doc, (2) Storage Image
            await firebase.firestore().collection(COLLECTION).doc(p.docId).delete()

        

            const imageRef = firebase.storage().ref().child(IMAGE_FOLDER + p.image)

            console.log('await image delete')
            await imageRef.delete()

            //assign id for card

            const card = document.getElementById(p.docId)
            card.parentNode.removeChild(card)

            delete products[index]
        } catch (e) {

            glPageContent.innerHTML  = 'Delete Error: <br>' + JSON.stringify(e)
            
        }
    }

    




  

