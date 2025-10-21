const express = require('express');
require('dotenv').config();

const configureServer = require('./config/server-config');
const connectDB = require('./config/db_config');
const errorHandler = require('./middleware/error_handler');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const visitorRoutes = require('./routes/visitor.routes');
const articlesRoutes = require('./routes/article.routes');

const app = express();
const PORT = process.env.PORT || 5000;

configureServer(app, {
    corsOptions: {
        origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:4200'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true,
        optionsSuccessStatus: 204,
    },
});

app.use('/api/auth', authRoutes);
app.use('/api/admin/', adminRoutes);
app.use('/api/users/', articlesRoutes);
app.use('/api/visitor', visitorRoutes);

app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Server started on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Server startup failed:', err.message);
        process.exit(1);
    }
};

startServer();