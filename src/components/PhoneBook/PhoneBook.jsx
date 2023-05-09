import React, { useEffect, useState } from "react";
import './PhoneBook.css'

function UserForm({ firstName, lastName, phoneNumber, handleInput, handleSubmit }){
    return (
        <form className="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First name</label>
                <input type="text" name="firstName" id="first-name" value={firstName} onChange={handleInput}/>
            </div>
            <div>
                <label htmlFor="lastName">Last name</label>
                <input type="text" name="lastName" id="last-name" value={lastName} onChange={handleInput}/>
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" name="phoneNumber" id="phone-number" value={phoneNumber} onChange={handleInput}/>
            </div>
            <button type="submit">
                Submit
            </button>
        </form>
    )
}

const PhoneBook = () => {
    const [user, setUser] = useState({ firstName: 'Abhishek', lastName: 'Batra', phoneNumber: '9821765432'})
    const [contacts, setContacts] = useState([]);
    const [sortedContacts, setSortedContacts] = useState([]);
    

    useEffect(()=>{ 
        console.log("Contacts in useEffect ", contacts);
        const sortedContactList = sortContacts(contacts)
        console.log("Sorted Contact list is ", sortedContactList);
        setSortedContacts(sortedContactList)
    },[])

    const sortContacts = (contacts) => {
        let updatedContacts = contacts.slice().sort((firstContact, secondContact)=>{
            console.log("First contact is ", firstContact);
            if(firstContact.lastName < secondContact.lastName) return -1;
            if(firstContact.lastName > secondContact.lastName) return 1;
            return 0 
        });
        console.log("Updated Contacts ", updatedContacts);
        return updatedContacts
    }

    const handleInput = (e) => {
        console.log("I am in handle Input ", e.target.name);
        const name = e.target.name;
        const value = e.target.value;
        if(name==='phoneNumber' && value.length>10){
            alert('Please enter the valid number')
            return false;
        }
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let userObject = {...user};
        const contactList = [...sortedContacts];
        const updatedUsers = [...contactList, userObject];
        const sortedContactList = sortContacts(updatedUsers);
        setSortedContacts([...sortedContactList]);
    }

    return (
        <div>
            <UserForm firstName={user.firstName} lastName={user.lastName} phoneNumber={user.phoneNumber} 
                      handleInput={handleInput} handleSubmit={handleSubmit}/>
            {sortedContacts && sortedContacts.length>0 && <div className="contactsContainer">
                {sortedContacts && sortedContacts.length>0 && sortedContacts.map((contact, i)=>{
                    return (
                        <div className="contactContainer" key={i}>
                            <div className="names">
                                <span>First Name</span> = <span>{contact.firstName}</span>
                            </div>
                            <div className="names">
                                <span>Last Name</span> = <span>{contact.lastName}</span>
                            </div>
                            <div className="names">
                                <span>Phone</span> = <span>{contact.phoneNumber}</span>
                            </div>
                        </div>
                    )
                })}
            </div>}
            
        </div>
    )
}

export default PhoneBook