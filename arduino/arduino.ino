
#define LED_PIN 13

#define FLYWHEEL_PIN 5
#define PUSHER_PIN 6

#define ACCEL_DELAY 200
#define FIRING_DELAY 250

int flywheelPower = 0;
int rof = 0;

void setup() {
	Serial.begin(9600);

	pinMode(LED_PIN, HIGH);
	pinMode(FLYWHEEL_PIN, HIGH);
	pinMode(PUSHER_PIN, HIGH);	

	digitalWrite(LED_PIN, LOW);
	digitalWrite(FLYWHEEL_PIN, LOW);
	digitalWrite(PUSHER_PIN, LOW);	
}

void loop() {
	if(Serial.available() > 0) {
		int reading = Serial.read();
		Serial.println((String)reading);
		if (reading < 91) {
			flywheelPower = map(reading, 65, 90, 0, 255);
			Serial.println("fp: " + (String)flywheelPower);
		} else if (reading > 96) {
			rof = map(reading, 97, 122, 0, 255);
			Serial.println("rof: " + (String)rof);
		}
	} 

	if (rof != 0 && flywheelPower != 0) {
		fire();
	}
}

void fire() {
	Serial.println("firing");

	analogWrite(FLYWHEEL_PIN, flywheelPower);
	delay(ACCEL_DELAY);
	analogWrite(PUSHER_PIN, rof);

	delay(FIRING_DELAY);

	digitalWrite(FLYWHEEL_PIN, LOW);
	digitalWrite(PUSHER_PIN, LOW);

	rof = 0;
	flywheelPower = 0;
}