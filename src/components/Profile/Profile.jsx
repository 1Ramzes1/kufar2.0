import React, {useEffect, useState} from "react";
import styles from "../../styles/Profile.module.css";
import {updateUser} from "../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";


const Profile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(({user}) => user);
    const [values, setValues] = useState({
        email: "",
        name: "",
        password: "",
        avatar: "",
    })
    useEffect(() => {
        if(!currentUser) return;

        setValues(currentUser);
    }, [currentUser])

    const handleChange = ({target: {value, name}}) => {
        setValues({...values, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isNotEmpty = Object.values(values).every((val) => val);
        if (!isNotEmpty) return;
        dispatch(updateUser(values));
  };

    return (
        <section className={styles.profile}>
            {!currentUser ? (
                <span>You need to Log In</span>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={values.email}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <input
                        type="name"
                        placeholder="Your Name"
                        name="name"
                        value={values.name}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <input
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        value={values.password}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <input
                        type="avatar"
                        placeholder="Your Avatar"
                        name="avatar"
                        value={values.avatar}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.submit}>
                    Update
                </button>
            </form>
            )}
        </section>
    )
}

export default Profile