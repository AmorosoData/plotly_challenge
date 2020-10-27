# dependencies
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

# Flask instance
app = Flask(__name__)

# Set database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/bb.sqlite'
db = SQLAlchemy(app)