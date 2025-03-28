import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../serveces/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store'
import { formatCurrency } from '../../utils/helpers'
import { fetchAddress } from '../user/userSlice';

// Phone validation regex reference: https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice
  const dispatch = useDispatch()

  const { username, status: addresStatus, position, addres, error: errorAddress } = useSelector(state => state.user)
  const isLoadingAddres = addresStatus === 'loading'

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();


  if (!cart.length) return <EmptyCart />

  return (
    <div className='px-4 py-6'>
      <h2 className='text-xl font-semibold mb-8'>{"Ready to order? Let's go!"}</h2>



      {/* { //<Form method="POST" action="/orede/new">} */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className='sm:basis-40'>First Name</label>
          <input className='input grow' type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full'
              type="tel"
              name="phone"
              required
            //pattern="^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"
            />

            {formErrors?.phone && <p className='text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md'>{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center relative">
          <label className='sm:basis-40' >Address</label>
          <div className='grow'>
            <input className='input w-full' type="text" name="address" disabled={isLoadingAddres} required defaultValue={addres} />
          </div>
          {addresStatus === 'error' && <p className='text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md'>{errorAddress}</p>}
          {!position.latitude && !position.longitude && <span className='absolute md:right-[5px] sm:top-[5px] z-50'>
            <Button type='small' disabled={isLoadingAddres} onClick={(e) => { e.preventDefault; dispatch(fetchAddress()) }}> Get position</Button>
          </span>}
        </div>

        <div className='mb-12 flex gap-5 items-center'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none 
            focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2'
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className='font-medium'> Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type='hidden' name='position' value={position.longitude && position.latitude ? `${position.latitude}, ${position.longitude}` : ''} />
          <Button disabled={isSubmitting || isLoadingAddres} type="primary">
            {isSubmitting ? 'Placing order...' : `Order now  from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give as your correct number. We might need it to contact you';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

// import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
// // const isValidPhone = (str) =>
// //   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
// //     str
// //   );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

// function CreateOrder() {
//   const [withPriority, setWithPriority] = useState(false);
//   const cart = fakeCart;

//   return (
//     <div>
//       <h2>Ready to order? Let's go!</h2>

//       <form>
//         <div>
//           <label>First Name</label>
//           <input type="text" name="customer" required />
//         </div>

//         <div>
//           <label>Phone number</label>
//           <div>
//             <input type="tel" name="phone" required />
//           </div>
//         </div>

//         <div>
//           <label>Address</label>
//           <div>
//             <input type="text" name="address" required />
//           </div>
//         </div>

//         <div>
//           <input
//             type="checkbox"
//             name="priority"
//             id="priority"
//             value={withPriority}
//             onChange={(e) => setWithPriority(e.target.checked)}
//           />
//           <label htmlFor="priority">Want to yo give your order priority?</label>
//         </div>

//         <div>
//           <button>Order now</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateOrder;
