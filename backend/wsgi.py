from application import create_app


app= create_app()


if __name__ == '__main__':
    app.run()
    #socketio.run(app, port=5001, debug=True)
'''elif __name__ == 'wsgi':
    #app.run()
    socketio.run(app, allow_unsafe_werkzeug=True)'''