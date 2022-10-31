const Card = ({ id, name, brand, model, price, image }) => {


    return (
        <div key={id} className="card">

            <img className='cardImage' src={image} alt='vehicle image' />

            <div className="cardInfo">
                <strong className="title">{brand} {name}</strong>
                <strong className="title">{model}</strong>
                <strong className="price">R$ {price.toFixed(2)}</strong>
            </div>
        </div>
    )
}

export default Card;

