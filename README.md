# Alke Wallet 💰

[![Java](https://img.shields.io/badge/Java-17-orange)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/Database-MySQL-blue)](https://www.mysql.com/)

**Alke Wallet** es una solución de billetera digital diseñada para simplificar la gestión financiera de los usuarios. Esta aplicación permite realizar operaciones bancarias esenciales como depósitos, transferencias y consultas de saldo a través de una interfaz robusta y segura.

---

## Características Principales

* **Autenticación de Usuarios:** Registro e inicio de sesión seguro.
* **Gestión de Cuentas:** Visualización del estado de cuenta y saldo disponible.
* **Transacciones:** Envío de dinero entre usuarios de la plataforma y depósitos.
* **Historial:** Registro detallado de todos los movimientos (ingresos y egresos).
* **Seguridad:** Implementación de lógica de validación para evitar saldos negativos o transacciones erróneas.

---

## Tecnologías Utilizadas

### Backend
* **Java 17:** Lenguaje de programación principal.
* **Spring Boot 3.x:** Framework para la creación de la aplicación.
* **Spring Data JPA:** Para la persistencia de datos.
* **Spring Security:** (Opcional) Gestión de acceso y seguridad.

### Base de Datos
* **MySQL:** Almacenamiento relacional de datos.
* **H2 Database:** Para pruebas en entorno de desarrollo.

---

## Configuración e Instalación

### Requisitos Previos
* **JDK 17** o superior.
* **Maven 3.6+**.
* **MySQL Server** configurado.

### Pasos para la instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/RakinARPG/alke-wallet.git](https://github.com/RakinARPG/alke-wallet.git)
    cd alke-wallet
    ```

2.  **Configurar la base de datos:**
    Abre el archivo `src/main/resources/application.properties` y ajusta tus credenciales:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/nombre_tu_db
    spring.datasource.username=tu_usuario
    spring.datasource.password=tu_password
    spring.jpa.hibernate.ddl-auto=update
    ```

3.  **Compilar y ejecutar:**
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

---

##  Estructura del Proyecto

* `src/main/java/com/alke/wallet/controller`: Controladores REST que gestionan las peticiones HTTP.
* `src/main/java/com/alke/wallet/service`: Capa de lógica de negocio.
* `src/main/java/com/alke/wallet/model`: Entidades de la base de datos y DTOs.
* `src/main/java/com/alke/wallet/repository`: Interfaces para el acceso a datos (JPA).

---

## 📄 Licencia

Este proyecto se encuentra bajo la licencia **MIT**. Siéntete libre de usarlo y modificarlo para fines educativos.

---

## Autor

* **RakinARPG** - [Perfil de GitHub](https://github.com/RakinARPG)

¿Necesitas ayuda con este proyecto? No dudes en abrir un *Issue* o contactarme.