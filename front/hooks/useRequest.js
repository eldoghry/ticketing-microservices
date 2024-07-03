import { useState } from 'react'
import axios from 'axios';

const useRequest = ({ url, method, body, onSuccess }) => {
    const [error, setError] = useState(null);

    const doRequest = async () => {
        try {
            setError(null);
            const { data } = await axios[method](url, body);


            if (onSuccess) { onSuccess(data) }

            return data

        } catch (err) {
            console.log(err.response.data);
            setError(<div className="alert alert-danger my-2">
                <h4>Opps...</h4>
                <ul className='my-2'>
                    {err.response.data.errors.map((e) => (
                        <li key={e.message}>{e.message}</li>
                    ))}
                </ul>
            </div>);
        }
    }

    return { doRequest, error }

}


export default useRequest