import React, {useEffect, useState, useMemo} from 'react';
import socketio from "socket.io-client";
import api from '../../services/api';

import './styles.css';
import { Link } from 'react-router-dom';

const Dashboard = ({history}) => {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
   
    const user = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3335', {
        query: {user}
    }), [user]);
   
    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            const reponse = await api.get('/dashboard', {headers:{
                user
            }});
            setSpots(reponse.data)
        }

        loadSpots();
    }, [user]);

    async function handleRemove(id){
        await api.delete(`/spots/${id}`);

        history.push('dashboard');
    }

    async function handleApprove(id) {
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));     
    }

    return (
        <>
        <ul className="notifications">
            {requests.map(request => (
                <li key={request._id}>
                    <p>
                        <strong>{request.user.email}</strong> 
                        está solicitando uma reserva em 
                        <strong>{request.spot.company}</strong> 
                        para a data: 
                        <strong>{request.spot.date}</strong>
                    </p>
                    <button className="accept" onClick={() => handleApprove(request._id)}>ACEITAR</button>
                    <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                </li>
            ))}
        </ul>
        <ul className="spot-list">
            {spots && spots.map(spot => (
                <li key={spot._id}>
                    <header style={{backgroundImage:`url(${spot.thumbnail_url})`}}>
                        
                    </header>
                    <div className="spot-botton">
                        <div className="spot-info">
                            <strong>{spot.company}</strong>
                            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUÍTO'}</span>
                        </div>
                        <button className="del-button" onClick={() => handleRemove(spot._id)}>Apagar</button>
                    </div>
                </li>
            ))}
        </ul>
         <Link to="/newspot">
                <button className="btn">Cadastrar novo Spot</button>
        </Link>           
        </>
    )
}

export default Dashboard;