import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);

    const header = screen.queryByText(/Contact Form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const input = 'Davi';
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, input);
    
    const output = await screen.findByText(/Error:/i);
    expect(output).toBeInTheDocument();
    expect(output).toBeTruthy();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const button = screen.getByRole('button');
    userEvent.click(button); 

    const output = await screen.findAllByText(/Error:/i);
    expect(output).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstName = 'David';
    const lastName = 'Aihe;';

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, firstName);

    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, lastName);

    const button = screen.getByRole('button');
    userEvent.click(button);
    
    const output = await screen.findByText(/Error:/i);
    expect(output).toBeInTheDocument();
    expect(output).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const input = 'danny';

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, input);

    const output = await screen.findByText(/email must be a valid email address/i);
    expect(output).toBeInTheDocument();
    expect(output).toBeTruthy();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const firstName = 'David';
    const email = 'doa@gmail.com'

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, firstName);

    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, email);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const output = await screen.findByText(/lastName is a required field/i);
    expect(output).toBeInTheDocument();
    expect(output).toBeTruthy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstName = 'David';
    const lastName = 'Aihe';
    const email = 'doa@gmail.com'

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, firstName);

    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, lastName);

    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, email);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(()=> {
        const firstnameDisplay = screen.queryByText('David');
        const lastnameDisplay = screen.queryByText('Aihe');
        const emailDisplay = screen.queryByText('doa@gmail.com');
        const messageDisplay = screen.queryByTestId('messageDisplay');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    
    const firstName = 'David';
    const lastName = 'Aihe';
    const email = 'doa@gmail.com'
    const message = 'Just testing it out'

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, firstName);

    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, lastName);

    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, email);

    const messageInput = screen.getByLabelText(/Message/i);
    userEvent.type(messageInput, message);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(()=> {
        const firstnameDisplay = screen.queryByText('David');
        const lastnameDisplay = screen.queryByText('Aihe');
        const emailDisplay = screen.queryByText('doa@gmail.com');
        const messageDisplay = screen.queryByText('Just testing it out');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    })
});