import axios from "axios"

const Delete = ({bookIdToDelete, setSureToDelete}) => {

    const del_pop_up_container_style ={
        position:"fixed",
        top:"0",
        left:0,
        height:"100%",
        width:"100%",
        // backgroundColor:"none",
        // opacity:"0.9",
        // zIndex:"0",
    }

    const styles = {
        color:"#0d0d0d",
        height:"200px",
        margin:"0",
        padding:"0",
        boxSizing:"border-box",
        width:"500px",
        backgroundColor:"white",
        // center pop-up
        position:"fixed",
        top:"50%",
        left:"50%",
        transform: "translate(-50%, -50%)",
        // border, shadow
        border: "1px solid black",
        borderRadius:"10px",
        // boxShadow: "5px 10px 8px 10px #888888",
        // boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
    }
    // Pop-up Body
    const popUpBodyStyle = {
        width:"90%",
        // border: "1px solid black",
        position:"absolute",
        top:"40%",
        left:"50%",
        transform: "translate(-50%, -50%)",
    }
    // Pop-up Footer
    const popUpFooterStyle = {
        height:"90%",
        display:"flex",
        alignItems:"end",
        justifyContent:"center",
        gap:"30%",
    }
    // Buttons
    const buttonStyle = {
        // width:"50px",
        border:"none",
        padding:"8px 20px 8px 20px",
        borderRadius:"8px",
        cursor:"pointer",
        fontWeight:"bold",
        color:"#003300",

    }
    const yesButtonStyle ={
        backgroundColor:"#339933",
    }
    const noButtonStyle ={
        backgroundColor:"#99ff66",
    }

    // console.log(bookIdToDelete)
    // Yes Button
    const handleYes = async () => {
        try{
            await axios.delete(`http://localhost:8800/books/${bookIdToDelete}`)
            window.location.reload()
        } catch(err){
            console.log(err);
        }
    }
    // No Button
    const handleNo = () => {
        setSureToDelete(false)
    }

    return(
        <div className="del-pop-up-container" style={del_pop_up_container_style}>
            <div className="delete-pop-up" style={styles}>
                <div className="pop-up-header"></div>
                <div className="pop-up-body" style={popUpBodyStyle}>
                    <h3>Are you sure to Delete the Book?</h3>
                </div>
                <div className="pop-up-footer" style={popUpFooterStyle}>
                    <button style={{...buttonStyle, ...yesButtonStyle}} onClick={handleYes}>Yes</button>
                    <button style={{...buttonStyle, ...noButtonStyle}} onClick={handleNo}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Delete;