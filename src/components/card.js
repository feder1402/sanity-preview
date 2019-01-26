import React from 'react'


const Card = ({ children }) =>
    <div className="col-lg-8 col-md-12 col-sm-12" id="stickyContainer">
        <div className="row">
            <div className="row">
                <div className="card addOn-card">
                    <div className="card-border bg-primary"></div>
                    <div className="card-block">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>


export default Card