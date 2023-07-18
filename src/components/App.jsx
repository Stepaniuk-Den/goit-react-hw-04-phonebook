import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import Section from './Section/Section';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import { FilterBar } from './FilterContact/FilterBar';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts) ?? [];
    setContacts(parsedContacts.length ? parsedContacts : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = contactData => {
    const contact = {
      id: nanoid(),
      ...contactData,
    };
    setContacts(prevState => [contact, ...prevState]);
  };

  const onDublicate = dublicated => {
    const dublicate = contacts.filter(contact => contact.name === dublicated);
    return dublicate.length > 0;
  };
  const onFilter = filtered => {
    setFilter(filtered);
  };

  const onRemoveContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  );
  return (
    <div className="container">
      <Section title="Phonebook">
        <ContactForm onAddContact={onAddContact} onDublicate={onDublicate} />
      </Section>
      <Section title="Contacts">
        <FilterBar filter={filter} onFilter={onFilter} />
        <ContactList
          contacts={filteredContact}
          onRemoveContact={onRemoveContact}
        />
      </Section>
    </div>
  );
};
