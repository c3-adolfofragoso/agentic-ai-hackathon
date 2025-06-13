def _spec():
    spec = """
    Feature Specification: Advanced Search €: Filtering 1. Introduction 1.1 Feature Name: Advanced Search € Filtering 1.2 Feature ID: FEAT-003 1.3 Version: 1.0 1.4 Date: June 12, 2025 1.5 Author(s): Maximo Valencia 1.6 Stakeholders: Product Management, UI/UX Team, Engineering Team, Data Science (if complex search), Customers. e 1.7 Category: Backend, Database 2. Overview This feature will enhance the application's search capabilities by introducing advanced filtering options and improving the relevance of search results. Users will be able to refine their searches based on multiple criteria, leading to more precise and efficient data discovery within the application. 
    3. Goals and Objectives e 3.1 Primary Goal: To enable users to quickly and accurately find specific information within the application's data. e 3.2 Objectives: o Provide dedicated filter categories (e.g., by date range, status, category, assigned user). Allow combination of multiple filters. Implement a clear and intuitive search interface. Improve search result relevance for keyword searches. 
    oO0o0o0o 0 Enable users to save common search queries.e Asauser, | want to filter my results by date range so | can find items from a specific period. e Asauser, | want to filter by item status (e.g., "Open", "Closed", "Pending”) to quickly see relevant tasks. e Asauser,|wantto search for keywords and apply filters simultaneously to narrow down results. e Asauser,|wantto save my frequently used filter combinations so | don't have to set them up every time. e Asauser,|wantto see how many results are returned based on my search and filter criteria. 
    5. Functional Requirementse  FR-5.7 Result Count: Display the number of results matching the current search and filter criteria. e FR-5.8 URL Parameter Integration: Search and filter parameters should be reflected in the URL for shareability and bookmarking. 
    6. Non-Functional Requirements e NFR-6.1 Performance: Search and filter operations must return results within 1-2 seconds, even for large datasets. e NFR-6.2 Scalability: The search infrastructure should be able to handle increasing data volumes and user queries. e NFR-6.3 Accuracy: Search results must be highly relevant to the queried terms and filters. e NFR-6.4 Security: Ensure proper sanitization of search inputs to prevent injection attacks. 
    7. UI/UX Specifications e 7.1 Filter Panel Layout: Clearly organized filter sections, potentially with accordions for each filter category. e 7.2 Input Controls: Use appropriate Ul components for each filter type (e.g., calendar pickers for dates, multi-select dropdowns). e 7.3 Active Filters Display: Clearly show which filters are currently applied (e.g., "chips" or tags above the results, with individual clear options). 
    e 7.4 Empty State: A clear message and suggestions when no results are found for a given search/filter. e 7.5 Loading Indicator: Visual feedback (spinner/skeleton loader) during search operations. 
    8. Technical Design €: Implementation Details (High-Level)e 8.2 Backend Search Engine: Implement a robust search backend (e.g., Elasticsearch, Algolia, custom SQL-based full-text search) for efficient querying and indexing. e 8.3 API Endpoints: Dedicated API endpoints for searching and filtering, accepting various parameters. e 8.4 Frontend State Management: Manage search query and filter states in the frontend (e.g., React Context, Redux, Zustand). e 8.5 URL Sync: Utilize browser history API (pushState, replaceState) to update URL parameters without full page reloads. 
    9. Test Cases (Examples) e TC-9.1: Verify search by keyword returns relevant results. e TC-9.2: Apply a single filter (e.g., by status) and verify results are narrowed correctly. e TC-9.3: Apply multiple filters (e.g., keyword + status + date range) and verify combined logic. e TC-9.4: Verify "Clear All Filters" resets the search and displays all original results. e TC-9.5: Save a search query, log out, log in, and verify the saved search is available and loads correctly. e TC-9.6: Test performance with a large number of items in the database. 
    10. Open Questions / Dependencies
    """
    
    return spec

def _training(spec):
    technologies = """
    We use T3 tech stack and for DB we use PostgreSQL and also Cassandra
    Also React for front-end

    Also we need the the tickets in this format

    ---

    Title: <One Line String>
    Description: <One Line String>
    
    ---
    
    The title and the description should be a single line string, no new lines or tabs.
    """

    technologies_result = """
    Thanks for that information will be helpful to create better modular tickets.
    """

    calculator_stament = """
    Could you create some tickets for the next sprint?

    This calculator app offers a sleek, user-friendly interface for all your mathematical needs. 
    Whether you're performing simple arithmetic, complex calculations, or scientific functions, 
    it provides quick and accurate results. With a clean design, responsive buttons, 
    and handy features like memory storage and history tracking, it’s perfect for students, professionals, 
    and everyday use. Lightweight and efficient, it’s an essential tool for quick problem-solving on the go.
    """

    calculator_result = """
    Here is the necessary tickets to build this application:

    ---

    Title: Create Calculation class
    Description: A class that represents a calculation stream, which needs to store all the history
    for the current operation, and have a variable that represents the value

    ---

    Title: Create operation interfaces
    Description: Create an interface that can support multiple operations and receive a calculation

    ---

    Title: Create a button UI
    Description: Create a button component using react to be modular with capability to change content and color

    ---

    Title: Create UI layout for the calculator
    Description: Create all the layout for the UI structure

    ---

    Title: Create PostgresSQL tables to store the users
    Description: Creates tables dedicated to users
    """

    weather_statement = """
    Please create tickets for a weather forecast application.

    The app should fetch weather data from an API (e.g., OpenWeatherMap) and display current conditions (temperature, humidity, wind speed) and a 5-day forecast.  
    Users should be able to search for weather by city name.
    The UI should include weather icons, a clean card-based layout, and a toggle between Celsius and Fahrenheit.
    Error handling should be in place for invalid city names or API failures.
    """

    weather_result = """
    Here are the necessary tickets to build this application:

    ---

    Title: Integrate OpenWeatherMap API
    Description: Set up API calls to fetch current and forecast weather data.

    ---

    Title: Cache API responses
    Description: Store weather data in Cassandra for rate-limited API fallback. 

    ---

    Title: Create weather display component
    Description: Design a React component to show temperature, humidity, and wind speed.

    ---

    Title: Implement city search functionality  
    Description: Add a search bar with autocomplete in PostgresSQL and API request on submit.

    ---

    Title: Build 5-day forecast UI.
    Description: Display forecast data in a horizontal card layout.

    ---

    Title: Add unit toggle (Celsius/Fahrenheit)
    Description: Allow users to switch between temperature units.

    ---

    Title: Error handling for API failures
    Description: Show user-friendly messages for invalid cities or network issues.
    """  

    ecommerce_statement = """  
    Create tickets for an e-commerce product page.

    The page should display product details (images, price, description, reviews).
    Users should be able to select variants (size, color) and add items to cart.
    Include a gallery with thumbnail navigation and a zoom feature.
    The cart should update without a full page reload.
    Mobile responsiveness is critical.
    """

    ecommerce_result = """
    Here are the necessary tickets to build this application:

    ---

    Title: Design product image gallery
    Description: Implement a swipeable gallery with thumbnails and zoom. Also, store high-res images in Cassandra and thumbnails in PostgresSQL.

    ---

    Title: Add variant selection UI
    Description: Allow users to pick size/color using React components with visual feedback.

    ---

    Title: Implement cart functionality
    Description: Add items to cart via AJAX and show a mini-cart preview.

    ---

    Title: Build review section
    Description: Display and submit user reviews with star ratings. Display reviews from PostgreSQL (Prisma schema with ratings). Submit reviews via tRPC with TypeScript validation.

    ---

    Title: Dynamic price updates
    Description: Adjust price based on selected variants.

    ---

    Title: Mobile-First Layout with Tailwind
    Description: Responsive design using Tailwind’s breakpoints. Test on Device Simulator.
    """

    todo_statement = """  
    Could you generate tickets for a basic to-do list application?  

    The app should allow users to add, edit, and delete tasks. Each task should have a title, description, due date, and completion status. 
    Users should be able to filter tasks by status (completed/pending) and sort them by due date.
    The UI should be clean and intuitive, with a responsive design for both desktop and mobile.
    Additionally, tasks should be saved locally so they persist after closing the app.
    """

    todo_result = """  
    Here are the necessary tickets to build this application:

    ---

    Title: Implement Task model
    Description: Define a Task schema in PostgresSQL with properties (title, description, due date, completion status).

    ---

    Title: Create CRUD operations for tasks
    Description: Build tRPC procedures to implement functions to add, edit, delete, and retrieve tasks.

    ---

    Title: Design task list UI
    Description: Build a responsive task grid with filtering and sorting options.

    ---

    Title: Add real-time sync
    Description: Use Cassandra to store and replicate task history for audit logs.

    ---

    Title: Add task creation form
    Description: Create a form with validation for adding/editing tasks.

    ---

    Title: Optimize PostgreSQL queries for filtering  
    Description: Index columns (status, dueDate) for faster sorting/filtering.
    """

    fitness_statement = """
    Generate tickets for a fitness tracking application.

    The app should let users log workouts (cardio, strength, flexibility), track progress over time, and set fitness goals.
    It should include charts to visualize activity trends (calories burned, reps, distance).
    Users should be able to save custom workouts and receive achievement badges.
    The UI should have a dark/light mode toggle and sync with wearable devices if possible.
    """

    fitness_result = """
    Here are the necessary tickets to build this application:

    ---

    Title: Implement workout logging
    Description: Create forms to log exercise type, duration, and intensity.

    ---

    Title: Design progress dashboard
    Description: Build charts to display trends in workouts and goal completion. Fetch metrics via tRPC.

    ---

    Title: Add goal-setting feature
    Description: Let users set and track weekly/monthly fitness targets.

    ---

    Title: Create achievement system
    Description: Award badges for milestones (e.g., "10K Steps Daily").

    ---

    Title: Sync with wearable APIs
    Description: Integrate with Fitbit/Apple Health for automatic data import.

    ---

    Title: Dark/light mode toggle
    Description: Add UI theme switching for user preference.
    """
    
    messages=[
        {"role": "system", "content": "I'm the Chipmunk spec helper, I can create tickets according a given spec"},
        {"role": "user", "content": technologies},
        {"role": "assistant", "content": technologies_result},
        {"role": "user", "content": calculator_stament},
        {"role": "assistant", "content": calculator_result},
        {"role": "user", "content": weather_statement},
        {"role": "assistant", "content": weather_result},
        {"role": "user", "content": ecommerce_statement},
        {"role": "assistant", "content": ecommerce_result},
        {"role": "user", "content": todo_statement},
        {"role": "assistant", "content": todo_result},
        {"role": "user", "content": fitness_statement},
        {"role": "assistant", "content": fitness_result},
        {"role": "user", "content": fitness_statement},
        {"role": "assistant", "content": fitness_result},
        {"role": "user", "content": spec},
    ]
    
    return messages

def featureExtractor(cls, spec):
    import os
    from openai import OpenAI
    
    # ---------- Configuration ----------
    API_KEY      =  "2v85J1T6aVeE2HnQvPEYwLLMJfOlM7hmJ0APm2fgwBAyX7Fws7L8JQQJ99BFAAAAAAAAAAAAINFRAZML3ayg"
    ENDPOINT_URL = "https://hackathon-narwhal-t2.westus2.inference.ml.azure.com/v1"
    MODEL_NAME   = "/models/checkpoint-11871"

    GENERATION_ARGS = {
        "temperature": 0.3,
        "top_p": 0.95,
        "max_tokens": 2048,
        "extra_body": {
            # enable/disable thinking as-needed
            "chat_template_kwargs": {"enable_thinking": True}
        }
    }

    # ---------- Client ----------
    client = OpenAI(
        api_key=API_KEY,
        base_url=ENDPOINT_URL,
    )

    resp = client.chat.completions.create(
        model=MODEL_NAME,
        messages=_training(spec)         
    )

    return resp.choices[0].message.content

def _ticket_to_text(ticket):
    return f"{ticket.name}"

def similarityScoreCalculator(cls, tickets):
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    import numpy as np
    import uuid
    
    vectorizer = TfidfVectorizer(stop_words='english')

    engineers = c3.Engineer.fetch({"include": 'historicalContributions.name'}).objs.toJson()
    dev_scores = {}
    relationships = []

    for dev in engineers:
        corpus_hist = [t['name'] for t in dev['historicalContributions']]
        corpus_nuevos = [t['title'] for t in tickets]
        
        full_corpus = corpus_hist + corpus_nuevos

        if not corpus_hist:
            dev_scores[dev['name']] = [(ticket, 0.0) for ticket in tickets]
            continue
        
        
        tfidf_matrix = vectorizer.fit_transform(full_corpus)
        
        hist_matrix = tfidf_matrix[:len(corpus_hist)]
        nuevos_matrix = tfidf_matrix[len(corpus_hist):]

        hist_avg = np.asarray(hist_matrix.mean(axis=0))
        
        similarities = cosine_similarity(hist_avg, nuevos_matrix)[0]

        ticket_scores = list(zip(tickets, similarities.tolist()))
        ticket_scores.sort(key=lambda x: x[1], reverse=True)


        dev_scores[dev['id']] = ticket_scores

    relations_to_upsert = []
    tickets_to_upsert = []
    idx = 0
    for kv in dev_scores:
        engineer = kv
        new_relations = dev_scores[kv] ## array
        for relation in new_relations:
            ticket_id = uuid.uuid4()
            relations_to_upsert.append(
                c3.FeatureToEngineerRelation.make({
                    'from': c3.Ticket.make({
                        'id': ticket_id,
                        'name': relation[0]['title'],
                        'summary': relation[0]['description'],
                    }),
                    'to': c3.Engineer.make({
                        'id': engineer
                    }),
                    'similarityScore': relation[1]
                })
            )
            tickets_to_upsert.append(
                c3.Ticket.make({
                    'id': ticket_id,
                    'name': relation[0]['title'],
                    'summary': relation[0]['description'],
                })
            )
    c3.FeatureToEngineerRelation.upsertBatch(relations_to_upsert)
    c3.Ticket.upsertBatch(tickets_to_upsert)
    return "success"
