import { useFetcher } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '../../ui/Button'
import { updateOrder } from '../../serveces/apiRestaurant'

function UpdateOrder({ order }) {
    const fetcher = useFetcher()
    console.log(order)

    return (
        <fetcher.Form method='PATCH' className='text-right'>
            <Button type='primary'>Make priority</Button>
        </fetcher.Form>
    )
}

// PropTypes validation
UpdateOrder.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,  // Adjust the type as needed
        status: PropTypes.string,  // Example additional field
    }).isRequired,
}

export default UpdateOrder

export async function action({ params }) {
    const data = { priority: true }
    await updateOrder(params.orderId, data)
    return null
}