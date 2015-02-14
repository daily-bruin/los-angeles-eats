import argparse
import json
import pprint
import sys
import urllib
import urllib2
import oauth2
import random
import csv


API_HOST = 'api.yelp.com'
DEFAULT_TERM = 'french'
DEFAULT_LOCATION = 'Los Angeles, CA'
SEARCH_LIMIT = 10
SEARCH_PATH = '/v2/search/'
BUSINESS_PATH = '/v2/business/'

# OAuth credential placeholders that must be filled in by users.
CONSUMER_KEY = "YorfavQ2A3vwy_Zbs77rwA"
CONSUMER_SECRET = "Re1eZh8gHwmXjKQtYQAoXPO5Y6I"
TOKEN = "DFtifOz217nG-eCJpQtvwBvERjaewDbr"
TOKEN_SECRET = "n5mPug2wZDBEX7-KLYDjJZ2TubA"


def request(host, path, url_params=None):
    """Prepares OAuth authentication and sends the request to the API.
    Args:
        host (str): The domain host of the API.
        path (str): The path of the API after the domain.
        url_params (dict): An optional set of query parameters in the request.
    Returns:
        dict: The JSON response from the request.
    Raises:
        urllib2.HTTPError: An error occurs from the HTTP request.
    """
    url_params = url_params or {}
    url = 'http://{0}{1}?'.format(host, urllib.quote(path.encode('utf8')))

    consumer = oauth2.Consumer(CONSUMER_KEY, CONSUMER_SECRET)
    oauth_request = oauth2.Request(method="GET", url=url, parameters=url_params)

    oauth_request.update(
        {
            'oauth_nonce': oauth2.generate_nonce(),
            'oauth_timestamp': oauth2.generate_timestamp(),
            'oauth_token': TOKEN,
            'oauth_consumer_key': CONSUMER_KEY
        }
    )
    token = oauth2.Token(TOKEN, TOKEN_SECRET)
    oauth_request.sign_request(oauth2.SignatureMethod_HMAC_SHA1(), consumer, token)
    signed_url = oauth_request.to_url()
    
    print u'Querying {0} ...'.format(url)

    conn = urllib2.urlopen(signed_url, None)
    try:
        response = json.loads(conn.read())
    finally:
        conn.close()

    output = dict()
    keys = []
    values = []

    file = open('temp.csv', 'w')
    for key, value in response.iteritems():
        if (key == "businesses"):
            for i in value:             #value is a list
                for k, v in i.iteritems():
                    if (k == "name"):
                        print v
                        # v = str(v)
                        file.write('*')
                        file.write(str(v.encode('utf8')))
                        file.write('\n')
                        # print v
                        keys.append(v.encode('utf8'))
                    if (k == "location"):
                        for kk, vv in v.iteritems():
                            if (kk == "display_address"):
                                address_list = []
                                for val in vv:
                                    val = str(val)
                                    file.write(val.replace(",", ""))
                                    file.write('\n')
                                    # print val
                                    address_list.append(val)
                        # print address_list
                        values.append(val)
                # print "\n"
    # print output
    print keys, values

    # random_business = random.randrange(0, 19, 2)
    # print output[random_business]
    # print output[random_business+1]

    # return output

def search(term, location):
    """Query the Search API by a search term and location.
    Args:
        term (str): The search term passed to the API.
        location (str): The search location passed to the API.
    Returns:
        dict: The JSON response from the request.
    """
    
    url_params = {
        'term': term.replace(' ', '+'),
        'location': location.replace(' ', '+'),
        'limit': SEARCH_LIMIT
    }
    return request(API_HOST, SEARCH_PATH, url_params=url_params)


# def get_business(business_id):
#     """Query the Business API by a business ID.
#     Args:
#         business_id (str): The ID of the business to query.
#     Returns:
#         dict: The JSON response from the request.
#     """
#     business_path = BUSINESS_PATH + business_id

#     return request(API_HOST, business_path)

# def query_api(term, location):
#     """Queries the API by the input values from the user.
#     Args:
#         term (str): The search term to query.
#         location (str): The location of the business to query.
#     """
#     response = search(term, location)

#     businesses = response.get('businesses')

#     if not businesses:
#         print u'No businesses for {0} in {1} found.'.format(term, location)
#         return

#     business_id = businesses[0]['id']

#     print u'{0} businesses found, querying business info for the top result "{1}" ...'.format(
#         len(businesses),
#         business_id
#     )

#     response = get_business(business_id)

#     print u'Result for business "{0}" found:'.format(business_id)
#     pprint.pprint(response, indent=2)


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('-q', '--term', dest='term', default=DEFAULT_TERM, type=str, help='Search term (default: %(default)s)')
    parser.add_argument('-l', '--location', dest='location', default=DEFAULT_LOCATION, type=str, help='Search location (default: %(default)s)')

    input_values = parser.parse_args()

    try:
        search(input_values.term, input_values.location)
    except urllib2.HTTPError as error:
        sys.exit('Encountered HTTP error {0}. Abort program.'.format(error.code))


if __name__ == '__main__':
    main()