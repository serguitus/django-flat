import json
import time

from flask import request
from git import Repo

from app import app, db
from app.forms import PrForm
from app.models import PR


repo_route = app.config['REPO_PATH']


@app.route('/')
@app.route('/repo')
def get_repo():
    repo = Repo(repo_route)
    return {'repo': repo._working_tree_dir}


@app.route('/branches')
def get_branches():
    repo = Repo(repo_route)
    return {'branches': [br.name for br in repo.heads]}


@app.route('/commits/<branch>')
def get_commits(branch):
    repo = Repo(repo_route)
    selected_branch = repo.heads[branch]
    commits = list(repo.iter_commits(branch, max_count=50))
    return {'commits': [{
        'message': commit.message,
        'author': commit.author.name,
        'date': commit.authored_date} for commit in commits]}


@app.route('/pr/create', methods=['POST'])
def create_pr():
    #print(request.get_json())
    form = PrForm()
    if form.validate_on_submit():
        pr = PR(
            title=form.title.data,
            description=form.description.data,
            base_branch=form.base_branch.data,
            compare_branch=form.compare_branch.data)
        db.session.add(pr)
        db.session.commit()
        # print(pr)
        return 'OK'
    return {'error': True}
