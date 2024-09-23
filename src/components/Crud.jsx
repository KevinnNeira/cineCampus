import React from 'react'

export const Crud = () => {
  return (
    <body>
    <body>
        <span className="message">MVC by express</span>
        <div className="container">
            <div className="admin-product-form-container">
                 <form id="myForm" action="/user/v1" method="POST">
                    <h3>add a new info</h3>
                    <input type="number" placeholder="Enter the user code" name="codigo" className="box"/>
                    <input type="text" placeholder="Enter the username" name="nombre" className="box"/>
                    <input type="text" placeholder="Enter the user's last name" name="apellido" className="box"/>
                    <input type="text" placeholder="Enter the user's nickname" name="nick" className="box"/>
                    <input type="email" placeholder="Enter the user's email" name="corro_electronico" className="box"/>
                    <input type="number" placeholder="Enter the user's phone number" name="telefono" className="box"/>
                    <input type="rol" placeholder="Enter the user role" name="rol" className="box"/>
                    <input type="file" accept="image/png, image/jpeg, image/jpg" name="product_image" className="box"/>
                    <input type="submit" className="btn" name="add" value="add"/>
                </form>
            </div>
            <div className="product-display">
                <table className="product-display-table">
                    <thead>
                        <tr>
                            <td>Codigo</td>
                            <td>Name</td>
                            <td>Last name</td>
                            <td>Nick</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Rol</td>
                            <td>Accion</td>
                        </tr>
                    </thead>
                    <tbody id="myTbody">
                            <tr>
                            <td><img src="//" height="100" alt=""/></td>
                            <td contenteditable></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <a href="#" className="btn"> edit </a>
                                <a href="#" className="btn"> delete </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </body>
</body>
  )
}

export default Crud;
