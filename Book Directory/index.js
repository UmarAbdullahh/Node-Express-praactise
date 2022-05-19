import express from "express";
const app=express()
import bodyParser from 'body-parser'
// import hbs from hbs
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine','hbs')
const port=3000 || process.env.PORT
let Book=[
    // {
    //     id:1,
    //     name:'book1',
    //     location:'xyz',
    //     writer:'Umar'
    // }
    // {
    //     id:2,
    //     name:'book2',
    //     location:'abc',
    //     writer:'Abdullah'
    // }
]
app.get('/createBook',(req,res)=>{
    res.render('create')
})
app.post('/addBook',(req,res)=>{
    const id=req.body.id
    const name=req.body.name
    const location=req.body.location
    const writer=req.body.writer
        Book.push({
            id:id,
            name:name,
            location:location,
            writer:writer
        })
    res.redirect('/books')
})
app.get('/books',(req,res)=>{
    res.render('index',{
        book:Book
    })
})
app.get('/books/:id',(req,res)=>{
    let data;
    let id=req.params.id
    
    for(let i=0;i<Book.length;i++){
        
         if(id==Book[i].id){
            data=Book[i]
            
        }
    }//console.log(data)
    res.render('getBook',{
        book:data
    })
})
app.get('/edit/:id',(req,res)=>{
    let data;
    let id=req.params.id
    for(let i=0;i<Book.length;i++){
        if(id==Book[i].id){
            data=Book[i]
            
        }
    } //console.log(data)
    res.render('editBook',{
        book:data
    })
})
app.post('/update/:id',(req,res)=>{
    const id=req.body.id
    const name=req.body.name
    const location=req.body.location
    const writer=req.body.writer
    // for (let i=0;i<Book.length;i++){
        // if(Book[i]==id){
            var editedBook = {id: id,name: name, location: location,writer:writer};

            Book = Book.map(u => u.id !== editedBook.id ? u : editedBook);
            // console.log('books -> ', Book)
            // console.log(req.body.id)
    res.redirect('/books')
})

app.post('/delete/:id',(req,res)=>{
    for(let i=0;i<Book.length;i++){
        if(req.params.id==Book[i].id){
            Book.splice(i,1)
        }
    }
    res.redirect('/books')
})
app.listen(port,()=>{
    console.log(`listeing to port at ${port}`)
})