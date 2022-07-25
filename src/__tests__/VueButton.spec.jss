// import {render, screen, fireEvent} from '@testing-library/vue';
// import VueButton from './components/VueButton.vue';

// test('increments value on click', async () => {
//   // The `render` method renders the component into the document.
//   // It also binds to `screen` all the available queries to interact with
//   // the component.
//   render(VueButton);

//   // queryByText returns the first matching node for the provided text
//   // or returns null.
//   expect(screen.queryByText('Times clicked: 0')).toBeTruthy();

//   // getByText returns the first matching node for the provided text
//   // or throws an error.
//   const button = screen.getByText('increment');

//   // Click a couple of times.
//   await fireEvent.click(button);
//   await fireEvent.click(button);

//   expect(screen.queryByText('Times clicked: 2')).toBeTruthy();
// });

// test('Should render slot', async () => {
//   const {getByText} = render(VueButton, {
//     slots: {
//       content: '<h1>Main Content</h1>',
//     },
//   });

//   expect(getByText(/main content/i)).toBeInTheDocument();
// });
