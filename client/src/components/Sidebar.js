import React, { useState } from "react";
import Select from "react-select";
import PanelToolbar from "./PanelToolbar";

const Sidebar = () => {
    const [space, selectSpace] = useState(null);
    const [activeRoom, setActiveRoom] = useState(null);
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    const rooms = [{ title: "room 1" }, { title: "room 2" }];

    const handleChange = (selectedSpace) => {
        selectSpace(selectedSpace);
    };

    return (
        <div className="sidebar">
            <p>Select a space</p>
            <Select value={space} onChange={handleChange} options={options} />
            <br />
            <p>Rooms</p>
            <div className="rooms">
                {rooms.map((room) => (
                    <div
                        key={room.title}
                        className={`room ${
                            activeRoom && room.title === activeRoom.title
                                ? "active"
                                : ""
                        }`}
                        onClick={() => {
                            setActiveRoom(room);
                        }}
                    >
                        {room.title}
                    </div>
                ))}
            </div>
            <PanelToolbar />
        </div>
    );
};

export default Sidebar;
