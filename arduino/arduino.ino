
#define LED_PIN 13


void setup() {
	Serial.begin(9600);

	pinMode(LED_PIN, HIGH);
}

void loop() {
	if(Serial.available() > 0) {
		digitalWrite(LED_PIN, HIGH);
	} else {
		digitalWrite(LED_PIN, LOW);
	}
}