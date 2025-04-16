# Converting Python TensorFlow Model to TensorFlow.js

This guide explains how to convert your Python TensorFlow model to TensorFlow.js format for use in the web application.

## Prerequisites

Before converting your model, ensure you have the following installed:

```bash
pip install tensorflow tensorflowjs
```

## Option 1: Convert an Existing Trained Model

If you've already trained your model with Python and have the model file:

```bash
python convert_model.py --model_path /path/to/your/model.h5 --output_dir public/models
```

## Option 2: Create a New Model (for testing)

If you don't have a trained model yet, you can create a simple untrained model:

```bash
python convert_model.py --create_new --output_dir public/models
```

## Verifying the Conversion

After conversion, you should have these files in your `public/models` directory:

- `model.json` - The model architecture and weights manifest
- One or more `.bin` files - The model weights
- `classes.json` - The class names for traffic signs

## Integrating with the React Application

The React application will automatically load these files when it starts. The model is loaded by the `modelService.js` file.

## Using Your Own Dataset

To train the model with your own dataset, modify your Python training script to match this structure:

```python
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import numpy as np

# Create model
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(43, activation='softmax')  # Number of classes
])

model.compile(optimizer='adam',
             loss='sparse_categorical_crossentropy',
             metrics=['accuracy'])

# Train the model with your data
# model.fit(...)

# Save the model
model.save('traffic_sign_model.h5')
```

Then convert it using Option 1 above.

## Troubleshooting

If you encounter issues with the conversion:

1. Check that you have the correct TensorFlow and TensorFlow.js versions
2. Ensure your model architecture is compatible with TensorFlow.js
3. Check that the input shape in `modelService.js` matches your model's expected input
4. Update the class names in `public/models/classes.json` if your model has different classes 