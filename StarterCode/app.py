import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///db/bellybutton.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table


#################################################
# Flask Setup
#################################################

app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""

@app.route("/api/v1.0/names")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)


@app.route("/metadata/<sample>")
def sample_metadata(sample):
    # Create our session (link) from Python to the DB
    session = Session(engine)


@app.route("/api/v1.0/samples")
def samples():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    
if __name__ == '__main__':
    app.run(debug=True)
