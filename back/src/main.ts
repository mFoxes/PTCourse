import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";


async function start() {
    const PORT = 5000;
    const app = await NestFactory.create(AppModule)
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('')
        
        .addApiKey({
            type: 'apiKey', // this should be apiKey
            name: 'authorization', // this is the name of the key you expect in header
            in: 'header',
        }, 'access-key' // this is the name to show and used in swagger
        )
        .setDescription('')
        .setVersion('1.0.0')
        .addTag('')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()
