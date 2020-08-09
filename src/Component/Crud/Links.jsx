
import React, { useEffect, useState} from "react";
import LinksForm from "./LinksForm";

import { db } from "../../Config/MyFirebase";
import { toast } from "react-toastify";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";



function searchingTerm(term){
  return function(x){
      return x.name.includes(term) || !term;
  }
}
const Links = () => {
  const [contacts, setcontacts] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [search , setSearch] =useState("");
  const [show, setShow]=useState(false);
  
  const getcontacts = async () => {
    db.collection("contacts").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      console.log(docs)
      setcontacts(docs);
    });
  };


  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this contact?")) {
      await db.collection("contacts").doc(id).delete();
      toast("Contact Removed Successfully", {
        type: "error",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    getcontacts();
  }, []);

  const addOrEditLink = async (linkObject) => {
    console.log(linkObject);
    try {
      if (currentId === "") {
        await db.collection("contacts").doc().set(linkObject);
        toast("New Contact Added", {
          type: "success",
          autoClose: 5000,
        });
      } else {
        await db.collection("contacts").doc(currentId).update(linkObject);
        toast("Contact Updated Successfully", {
          type: "info",
          autoClose: 5000,
        });
        setCurrentId("");
      }
    } catch (error) {
      toast(error,{
        type: "error",
        autoClose: 7000,
      });
    }
  };

  return (
    <Container className="card card-body border-primary"> 
    <Link to="/main">
      <Button>Regresar</Button>
    </Link>
      <div className="card card-body border-aqua">
            <div className="container">
               <p className="display-4 text-center">Contact Register</p>
            </div>
        </div>
         <div className="row">
            <div className="col-md-5">
               <LinksForm {...{addOrEditLink,currentId, contacts}}/>
              {/* <Search onDeleteLink={onDeleteLink} setCurrentId={setCurrentId}/>*/}
            </div>


            {/* Search Simple*/}
            
            <div className="col-md-7">
              <div  className="card card-body border-aqua">
              <p className="text-center">SEARCH CONTACTS</p>
              <div>
                <div  className="card card-body border-aqua">
                    <input 
                    type="text" 
                    name="search" 
                    placeholder="Search by name" 
                    className="form-control" 
                    onChange={e=>setSearch(e.target.value)}
                    />
                </div>
              </div>
            </div>

            <br/>
            <div className="container">
              <div style={{marginLeft: '240px'}}>
                <Button  onClick={()=>setShow(!show)}>
                  {show === false ? "Show Contacts": "Hide Contacts"}
                </Button>
              </div>  
            </div>
            { show && 
               <table className="table table-border-less table-stripped">
                     
                <thead className="thead-dark">
                      <tr>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>  
                     </tr>  
                </thead>
                <tbody>
                  {
                    contacts.length > 0 ?
                    contacts.filter(searchingTerm(search)).map((link)=>(
                      <tr key={link.id} >
                        <td>{link.name}</td>
                        <td>{link.telefono}</td>
                        <td>{link.email}</td>
                        <td>
                          <div className="btn text-primary">
                            <Button
                              className="btn btn-warning material-icons text-danger"
                              onClick={() => onDeleteLink(link.id)} 
                            >
                              delete
                            </Button>
                            <Button
                              className="btn btn-outline-light material-icons text-black"
                              onClick={() => setCurrentId(link.id)}
                            >
                              create
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )) :(
                      <tr>
                          <td colSpan={3}>No contacts</td>
                       </tr>
                    )
                  }
                </tbody>
              </table>
            }
              
            </div>
         </div>

    </Container>
  );
};

export default Links;