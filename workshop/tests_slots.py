from rest_framework.test import APITestCase
from django.urls import reverse

class AppointmentSlotsAPITest(APITestCase):
    def test_get_slots_returns_list_and_structure(self):
        """GET /api/appointments/slots/ should return 200 and a list of slot objects."""
        url = "/api/appointments/slots/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)

        # If there are any items, they should have 'date' and 'slots' keys
        if len(response.data) > 0:
            item = response.data[0]
            self.assertIn("date", item)
            self.assertIn("slots", item)
            self.assertIsInstance(item["slots"], list)

