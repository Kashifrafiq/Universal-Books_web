import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Albums.css"; // Custom CSS file for styling

const Albums = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAlbumsSelected, setIsAlbumsSelected] = useState(true);
    const [albumData, setAlbumData] = useState([
        {
            id: 1,
            cover_image_url: "https://via.placeholder.com/150",
            title: "Album Title",
            tracks: ["Track 1", "Track 2", "Track 3"],
            price: 29.99,
        },
    ]); // Mock data for album
    const [purchasedAlbums, setPurchasedAlbums] = useState([]); // Mock data for purchased albums
    const [loadingForAlbums, setLoadingForAlbums] = useState(false);
    const [loadingForPurchased, setLoadingForPurchased] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    const toggleButtonForAlbums = (buttonType) => {
        setIsAlbumsSelected(buttonType === "albums");
    };

    const navigateToAlbumsList = () => {
        navigate("/albums");
    };

    return (
        <div className="container" style={{ height: "100dvh" }}>
            {isLoading ? (
                <div className="loader-container">
                    <div className="loader">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            ) : (
                <div className="albums-container">
                    <div className="header">
                        <h2 className="header-title">Albums</h2>
                        <div className="toggle-buttons">
                            <button
                                className={isAlbumsSelected ? "active" : ""}
                                onClick={() => toggleButtonForAlbums("albums")}
                            >
                                Albums For Sale
                            </button>
                            <button
                                className={!isAlbumsSelected ? "active" : ""}
                                onClick={() => toggleButtonForAlbums("purchased")}
                            >
                                Purchased
                            </button>
                        </div>
                    </div>

                    {isAlbumsSelected ? (
                        <div className="albums-list">
                            {loadingForAlbums && <p>Loading albums...</p>}
                            {albumData.map((album) => (
                                <div key={album.id} className="album-card">
                                    <div className="album-image-container">
                                        <img
                                            src="https://djb5n3ph6rt61.cloudfront.net/images/album-cover-images/album-cover-image-05-06-2024-033456.jpg"
                                            alt={album.title}
                                            className="album-image"
                                        />
                                    </div>
                                    <div className="album-details">
                                        <h3 className="album-title">{album.title}</h3>
                                        <p className="album-tracks">
                                            {album.tracks.length} Tracks
                                        </p>
                                        <p className="album-price">
                                            ${album.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {!loadingForAlbums && albumData.length === 0 && (
                                <p>No albums available at the moment.</p>
                            )}
                        </div>
                    ) : (
                        <div className="purchased-list " style={{textAlign:"center"}}>
                            {loadingForPurchased && <p>Loading purchased albums...</p>}
                            {purchasedAlbums.map((album) => (
                                <div key={album.id} className="album-card">
                                    <div className="album-image-container">
                                        <img
                                            src={album.cover_image_url}
                                            alt={album.title}
                                            className="album-image"
                                        />
                                    </div>
                                    <div className="album-details">
                                        <h3 className="album-title">{album.title}</h3>
                                    </div>
                                </div>
                            ))}
                            {!loadingForPurchased && purchasedAlbums.length === 0 && (
                                <div style={{ height:"80dvh",display:"flex" , justifyContent:"center", alignItems:"center"}}>
                                    <div>
                                    <p style={{fontSize:"20px"}}>You haven’t purchased any albums yet.</p> <br />
                                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    <button style={{all:"unset", padding:"10px",borderRadius:"30px", width:"150px" , textAlign:"center", backgroundColor:"#44c8f5", cursor:"pointer"}} onClick={() => toggleButtonForAlbums("albums")}>
                                        Browse Albums
                                    </button>
                                    </div>  
                                </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Albums;
