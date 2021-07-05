import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const MembershipFee = ({ user, getUser }) => {
    const { membFeeId } = useParams();

    let history = useHistory();

    const [membFee, setMembFee] = useState({});

    useEffect(() => {
        const getMembFee = async () => {
            const response = await axios(`http://localhost:5000/membershipFees/find/${membFeeId}`);
            setMembFee(response.data.membFee);
        };
        getMembFee();
    });

    const handlerClickDelete = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const response = await axios.delete(`http://localhost:5000/membershipFees/delete/${membFeeId}`, {
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
        <div>
            <h2 className="mt-5"> {membFee.name}</h2>
            <h2 className="my-4"> {membFee.pvp} €</h2>
            <p> {membFee.description}</p>
            {user?.role === 1 ? <button
                className="mx-4 my-3 btn btn-warning">
                Modify
            </button> : ""}
            {user?.role === 1 ? <button
                className="mx-4 my-3 btn btn-danger"
                onClick={handlerClickDelete}>
                Delete
            </button> : ""}

        </div>
    );
};

export default MembershipFee;

