import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import '../Fees/Fees.css';

const MembershipFee = ({ user, getUser }) => {
    const { membFeeId } = useParams();

    let history = useHistory();

    const [membFee, setMembFee] = useState({});

    useEffect(() => {
        const getMembFee = async () => {
            const response = await axios(`/api/membershipFees/find/${membFeeId}`);
            setMembFee(response.data.membFee);
        };
        getMembFee();
    });

    const handlerClickDelete = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const response = await axios.delete(`/api/membershipFees/delete/${membFeeId}`, {
                headers: {
                    "Authorization": token
                }
            });

            getUser();

            history.push("/");
        } catch (err) {
            console.log(err.response.data)
        }
    }

    return (
        <div className="my-5 container">
            <h2> {membFee.name}</h2>
            <h1 className="my-4"> {membFee.pvp}€</h1>
            <p> {membFee.description}</p>

            {/* {user?.role === 1 ? <button
                className="mx-4 my-3 btn btn-warning">
                Modify
            </button> : ""} */}

            {user?.role === 1 ? <button
                className="mx-4 my-3 btn btn-danger"
                onClick={handlerClickDelete}>
                Delete
            </button> : ""}

        </div>
    );
};

export default MembershipFee;

