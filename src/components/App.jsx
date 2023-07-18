import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Section from './Section/Section';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import FilterBar from './FilterContact/FilterBar';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts) ?? [];
    parsedContacts.length
      ? this.setState({ contacts: parsedContacts })
      : this.setState({ contacts: [] });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = contactData => {
    const contact = {
      id: nanoid(),
      ...contactData,
    };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  onDublicate = dublicated => {
    const dublicate = this.state.contacts.filter(
      contact => contact.name === dublicated
    );
    return dublicate.length > 0;
  };
  onFilter = filtered => {
    this.setState({ filter: filtered });
  };

  onRemoveContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const filteredContact = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase().trim())
    );
    return (
      <div className="container">
        <Section title="Phonebook">
          <ContactForm
            onAddContact={this.onAddContact}
            onDublicate={this.onDublicate}
          />
        </Section>
        <Section title="Contacts">
          <FilterBar filter={this.state.filter} onFilter={this.onFilter} />
          <ContactList
            contacts={filteredContact}
            onRemoveContact={this.onRemoveContact}
          />
        </Section>
      </div>
    );
  }
}
